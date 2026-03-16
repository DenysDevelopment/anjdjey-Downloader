const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface SubmitResponse {
  jobId: string;
  status: string;
  fileId?: string;
  fromCache?: boolean;
}

export interface StatusResponse {
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
  processingTime?: number;
}

export interface StatsResponse {
  totalDownloads: number;
  completedDownloads: number;
  todayDownloads: number;
  todayCompleted: number;
}

export async function submitDownload(url: string, quality: string = 'BEST'): Promise<SubmitResponse> {
  const res = await fetch(`${API_BASE}/api/download`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, quality, source: 'WEB' }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error?.message || 'Ошибка');
  return json.data;
}

export async function getDownloadStatus(jobId: string): Promise<StatusResponse> {
  const res = await fetch(`${API_BASE}/api/download/${jobId}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error?.message || 'Ошибка');
  return json.data;
}

export async function getStats(): Promise<StatsResponse> {
  const res = await fetch(`${API_BASE}/api/stats`, { next: { revalidate: 60 } });
  const json = await res.json();
  return json.data;
}

export function getFileUrl(fileId: string): string {
  return `${API_BASE}/api/files/${fileId}`;
}
