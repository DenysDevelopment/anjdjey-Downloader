import fetch from 'node-fetch';
import { env } from '../config/env';
import { logger } from '../utils/logger';

const BASE = env.API_BASE_URL;

export interface SubmitResult {
  jobId: string;
  status: string;
  fileId?: string;
  fromCache?: boolean;
}

export interface StatusResult {
  id: string;
  status: string;
  platform: string;
  title?: string;
  thumbnail?: string;
  duration?: number;
  fileId?: string;
  fileName?: string;
  fileSize?: number;
  downloadUrl?: string;
  progress?: number;
  errorMessage?: string;
}

export interface MetadataResult {
  title: string;
  duration: number;
  thumbnail: string;
  uploader: string;
  platform: string;
  formats: { formatId: string; resolution: string; ext: string }[];
}

export const apiClient = {
  async submitDownload(
    url: string,
    quality: string,
    telegramUserId?: number,
  ): Promise<SubmitResult> {
    const res = await fetch(`${BASE}/api/download`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, quality, source: 'TELEGRAM' }),
    });
    const json = (await res.json()) as { success: boolean; data: SubmitResult };
    if (!json.success) throw new Error('Ошибка API при отправке запроса');
    return json.data;
  },

  async getStatus(jobId: string): Promise<StatusResult> {
    const res = await fetch(`${BASE}/api/download/${jobId}`);
    const json = (await res.json()) as { success: boolean; data: StatusResult };
    if (!json.success) throw new Error('Ошибка API при получении статуса');
    return json.data;
  },

  async getMetadata(url: string): Promise<MetadataResult> {
    const res = await fetch(`${BASE}/api/metadata`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const json = (await res.json()) as { success: boolean; data: MetadataResult };
    if (!json.success) throw new Error('Ошибка API при получении метаданных');
    return json.data;
  },

  getFileUrl(fileId: string): string {
    return `${BASE}/api/files/${fileId}`;
  },
};
