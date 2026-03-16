import { downloadRepository } from '../../infrastructure/repositories/download.repository';
import { storage } from '../../infrastructure/storage/local-storage';
import { prisma } from '../../config/database';
import { logger } from '../../utils/logger';

export async function cleanupExpiredFiles(): Promise<number> {
  const expired = await downloadRepository.findExpired(100);
  let cleaned = 0;

  for (const download of expired) {
    if (download.filePath) {
      await storage.delete(download.filePath);
      await prisma.download.update({
        where: { id: download.id },
        data: { status: 'EXPIRED', filePath: null },
      });
      cleaned++;
    }
  }

  if (cleaned > 0) {
    logger.info({ cleaned }, 'Очистка истёкших файлов');
  }

  return cleaned;
}

let cleanupInterval: ReturnType<typeof setInterval> | null = null;

export function startCleanupCron(intervalMinutes: number) {
  cleanupInterval = setInterval(
    () => {
      cleanupExpiredFiles().catch((err) =>
        logger.error({ err }, 'Ошибка очистки файлов'),
      );
    },
    intervalMinutes * 60 * 1000,
  );
  logger.info({ intervalMinutes }, 'Крон очистки файлов запущен');
}

export function stopCleanupCron() {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
    cleanupInterval = null;
  }
}
