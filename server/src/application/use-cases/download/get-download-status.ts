import { downloadQueue } from '../../../infrastructure/queue/download.queue';
import { downloadRepository } from '../../../infrastructure/repositories/download.repository';
import { AppError } from '../../../utils/errors';
import type { DownloadResult } from '@shared/types/download';

export async function getDownloadStatus(jobId: string): Promise<DownloadResult> {
  const download = await downloadRepository.findById(jobId);
  if (!download) {
    throw new AppError(404, 'Скачивание не найдено');
  }

  let progress: number | undefined;
  if (download.status === 'PROCESSING' || download.status === 'QUEUED') {
    try {
      const job = await downloadQueue.getJob(jobId);
      if (job) {
        progress = job.progress as number;
      }
    } catch {
      // Очередь может быть недоступна
    }
  }

  return {
    id: download.id,
    status: download.status,
    platform: download.platform,
    title: download.title ?? undefined,
    thumbnail: download.thumbnailUrl ?? undefined,
    duration: download.duration ?? undefined,
    fileId: download.fileId ?? undefined,
    fileName: download.fileName ?? undefined,
    fileSize: download.fileSize ?? undefined,
    downloadUrl: download.fileId ? `/api/files/${download.fileId}` : undefined,
    progress,
    errorMessage: download.errorMessage ?? undefined,
    processingTime: download.processingTime ?? undefined,
    createdAt: download.createdAt.toISOString(),
    completedAt: download.completedAt?.toISOString(),
  };
}
