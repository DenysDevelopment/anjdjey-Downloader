import { detectPlatform } from '@shared/utils/platform-detector';
import { Platform } from '@shared/types/platform';
import { downloadQueue } from '../../../infrastructure/queue/download.queue';
import { downloadRepository } from '../../../infrastructure/repositories/download.repository';
import { AppError } from '../../../utils/errors';
import { logger } from '../../../utils/logger';

interface SubmitDownloadInput {
  url: string;
  quality: string;
  source: 'WEB' | 'TELEGRAM' | 'API';
  ipAddress?: string;
  userAgent?: string;
  telegramUserId?: bigint;
  telegramChatId?: bigint;
}

export async function submitDownload(input: SubmitDownloadInput) {
  const platform = detectPlatform(input.url);
  if (platform === Platform.UNKNOWN) {
    throw new AppError(400, 'Неподдерживаемая платформа или неверная ссылка');
  }

  // Проверяем кэш недавних скачиваний
  const cached = await downloadRepository.findRecentByUrl(input.url, input.quality);
  if (cached && cached.fileId) {
    return {
      jobId: cached.id,
      status: 'COMPLETED' as const,
      fileId: cached.fileId,
      fromCache: true,
    };
  }

  // Создаём запись
  const download = await downloadRepository.create({
    originalUrl: input.url,
    platform,
    source: input.source,
    quality: input.quality as never,
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
    telegramUserId: input.telegramUserId,
    telegramChatId: input.telegramChatId,
  });

  // Добавляем в очередь
  const job = await downloadQueue.add(
    'download',
    {
      downloadId: download.id,
      url: input.url,
      platform,
      quality: input.quality,
    },
    { jobId: download.id },
  );

  await downloadRepository.update(download.id, { jobId: job.id! });

  logger.info({ downloadId: download.id, platform, url: input.url }, 'Скачивание добавлено в очередь');

  return { jobId: download.id, status: 'QUEUED' as const };
}
