import { Worker, Job } from 'bullmq';
import { v4 as uuid } from 'uuid';
import { redisConnection } from './connection';
import { downloadVideo, extractMetadata } from '../downloader/yt-dlp.service';
import { proxyManager } from '../downloader/proxy-manager';
import { storage } from '../storage/local-storage';
import { prisma } from '../../config/database';
import { env } from '../../config/env';
import { WORKER_CONCURRENCY, WORKER_RATE_LIMIT } from '../../config/constants';
import { logger } from '../../utils/logger';
import type { DownloadJobData } from './download.queue';

export function startDownloadWorker() {
  const worker = new Worker<DownloadJobData>(
    'video-download',
    async (job: Job<DownloadJobData>) => {
      const { downloadId, url, quality } = job.data;

      // Шаг 1: Обновить статус
      await prisma.download.update({
        where: { id: downloadId },
        data: { status: 'PROCESSING' },
      });
      await job.updateProgress(10);

      // Шаг 2: Получить метаданные
      const proxy = env.PROXY_ENABLED ? await proxyManager.getNext() : null;
      let metadata;
      try {
        metadata = await extractMetadata(url, proxy?.url);
      } catch (err) {
        if (proxy) await proxyManager.reportFailure(proxy.url);
        throw err;
      }
      if (proxy) await proxyManager.reportSuccess(proxy.url);

      await prisma.download.update({
        where: { id: downloadId },
        data: {
          title: metadata.title,
          description: metadata.description?.slice(0, 500),
          duration: metadata.duration,
          thumbnailUrl: metadata.thumbnail,
          originalAuthor: metadata.uploader,
          viewCount: metadata.viewCount,
          likeCount: metadata.likeCount,
          resolution: metadata.resolution,
        },
      });
      await job.updateProgress(30);

      // Шаг 3: Скачать видео
      const fileId = uuid();
      const ext = quality === 'AUDIO_ONLY' ? 'mp3' : 'mp4';
      const outputPath = storage.getPath(fileId, ext);
      const startTime = Date.now();

      const result = await downloadVideo(url, outputPath, quality, {
        proxy: proxy?.url,
      });
      await job.updateProgress(90);

      // Шаг 4: Сохранить результат
      const safeTitle = (metadata.title || 'video')
        .replace(/[^\w\sа-яА-ЯёЁ.-]/g, '')
        .trim()
        .slice(0, 100);

      await prisma.download.update({
        where: { id: downloadId },
        data: {
          status: 'COMPLETED',
          fileId,
          fileName: `${safeTitle}.${ext}`,
          filePath: result.filePath,
          fileSize: result.fileSize,
          mimeType: ext === 'mp3' ? 'audio/mpeg' : 'video/mp4',
          processingTime: Date.now() - startTime,
          expiresAt: new Date(Date.now() + env.FILE_TTL_HOURS * 60 * 60 * 1000),
          completedAt: new Date(),
        },
      });

      await job.updateProgress(100);
      logger.info({ downloadId, fileId, fileSize: result.fileSize }, 'Скачивание завершено');

      return { fileId, fileSize: result.fileSize };
    },
    {
      connection: redisConnection,
      concurrency: WORKER_CONCURRENCY,
      limiter: WORKER_RATE_LIMIT,
    },
  );

  worker.on('failed', async (job, err) => {
    if (job) {
      await prisma.download
        .update({
          where: { id: job.data.downloadId },
          data: {
            status: 'FAILED',
            errorMessage: err.message.slice(0, 500),
            retryCount: { increment: 1 },
          },
        })
        .catch(() => {});
      logger.error({ jobId: job.id, err: err.message }, 'Задача скачивания не удалась');
    }
  });

  worker.on('completed', (job) => {
    logger.debug({ jobId: job?.id }, 'Задача завершена');
  });

  logger.info('Воркер скачивания запущен');
  return worker;
}
