import { detectPlatform } from '@shared/utils/platform-detector';
import { Platform } from '@shared/types/platform';
import { extractMetadata as ytdlpExtract } from '../../../infrastructure/downloader/yt-dlp.service';
import { proxyManager } from '../../../infrastructure/downloader/proxy-manager';
import { redis } from '../../../config/redis';
import { env } from '../../../config/env';
import { METADATA_CACHE_TTL } from '../../../config/constants';
import { AppError } from '../../../utils/errors';
import crypto from 'crypto';

export async function extractMetadataUseCase(url: string) {
  const platform = detectPlatform(url);
  if (platform === Platform.UNKNOWN) {
    throw new AppError(400, 'Неподдерживаемая платформа или неверная ссылка');
  }

  // Проверяем кэш в Redis
  const cacheKey = `metadata:${crypto.createHash('sha256').update(url).digest('hex')}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    return { ...JSON.parse(cached), platform, fromCache: true };
  }

  const proxy = env.PROXY_ENABLED ? await proxyManager.getNext() : null;

  let metadata;
  try {
    metadata = await ytdlpExtract(url, proxy?.url);
  } catch (err) {
    if (proxy) await proxyManager.reportFailure(proxy.url);
    throw new AppError(502, 'Не удалось получить метаданные видео');
  }

  if (proxy) await proxyManager.reportSuccess(proxy.url);

  // Сохраняем в кэш
  await redis.set(cacheKey, JSON.stringify(metadata), 'EX', METADATA_CACHE_TTL);

  return { ...metadata, platform };
}
