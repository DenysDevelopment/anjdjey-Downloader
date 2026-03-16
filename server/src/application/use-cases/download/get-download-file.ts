import { downloadRepository } from '../../../infrastructure/repositories/download.repository';
import { storage } from '../../../infrastructure/storage/local-storage';
import { AppError } from '../../../utils/errors';

export async function getDownloadFile(fileId: string) {
  const download = await downloadRepository.findByFileId(fileId);
  if (!download) {
    throw new AppError(404, 'Файл не найден');
  }

  if (download.status === 'EXPIRED' || !download.filePath) {
    throw new AppError(410, 'Срок действия файла истёк');
  }

  if (download.expiresAt && download.expiresAt < new Date()) {
    throw new AppError(410, 'Срок действия файла истёк');
  }

  const exists = await storage.exists(download.filePath);
  if (!exists) {
    throw new AppError(410, 'Файл был удалён');
  }

  return {
    stream: storage.getStream(download.filePath),
    fileName: download.fileName || `video.${download.mimeType === 'audio/mpeg' ? 'mp3' : 'mp4'}`,
    mimeType: download.mimeType || 'video/mp4',
    fileSize: download.fileSize,
  };
}
