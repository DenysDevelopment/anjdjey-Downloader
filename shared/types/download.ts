import type { Platform } from './platform';

export const DownloadStatus = {
  QUEUED: 'QUEUED',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  EXPIRED: 'EXPIRED',
} as const;
export type DownloadStatus = (typeof DownloadStatus)[keyof typeof DownloadStatus];

export const DOWNLOAD_STATUS_LABELS: Record<DownloadStatus, string> = {
  [DownloadStatus.QUEUED]: 'В очереди',
  [DownloadStatus.PROCESSING]: 'Обработка',
  [DownloadStatus.COMPLETED]: 'Готово',
  [DownloadStatus.FAILED]: 'Ошибка',
  [DownloadStatus.EXPIRED]: 'Истекло',
};

export const DownloadSource = {
  WEB: 'WEB',
  TELEGRAM: 'TELEGRAM',
  API: 'API',
} as const;
export type DownloadSource = (typeof DownloadSource)[keyof typeof DownloadSource];

export const VideoQuality = {
  BEST: 'BEST',
  HD_1080: 'HD_1080',
  HD_720: 'HD_720',
  SD_480: 'SD_480',
  SD_360: 'SD_360',
  AUDIO_ONLY: 'AUDIO_ONLY',
} as const;
export type VideoQuality = (typeof VideoQuality)[keyof typeof VideoQuality];

export const VIDEO_QUALITY_LABELS: Record<VideoQuality, string> = {
  [VideoQuality.BEST]: 'Лучшее качество',
  [VideoQuality.HD_1080]: '1080p HD',
  [VideoQuality.HD_720]: '720p HD',
  [VideoQuality.SD_480]: '480p',
  [VideoQuality.SD_360]: '360p',
  [VideoQuality.AUDIO_ONLY]: 'Только аудио (MP3)',
};

export interface VideoMetadata {
  title: string;
  description: string;
  duration: number;
  thumbnail: string;
  uploader: string;
  viewCount: number;
  likeCount: number;
  resolution: string;
  formats: FormatInfo[];
}

export interface FormatInfo {
  formatId: string;
  ext: string;
  resolution: string;
  filesize: number | null;
  vcodec: string;
  acodec: string;
}

export interface DownloadRequest {
  url: string;
  quality: VideoQuality;
  source: DownloadSource;
}

export interface DownloadResult {
  id: string;
  status: DownloadStatus;
  platform: Platform;
  title?: string;
  thumbnail?: string;
  duration?: number;
  fileId?: string;
  fileName?: string;
  fileSize?: number;
  downloadUrl?: string;
  progress?: number;
  errorMessage?: string;
  processingTime?: number;
  createdAt: string;
  completedAt?: string;
}
