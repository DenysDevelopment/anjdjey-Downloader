'use client';

import type { StatusResponse } from '@/lib/api';
import { getFileUrl } from '@/lib/api';

interface DownloadCardProps {
  result: StatusResponse;
}

export function DownloadCard({ result }: DownloadCardProps) {
  const fileUrl = result.fileId ? getFileUrl(result.fileId) : null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
      <div className="flex gap-4">
        {result.thumbnail && (
          <img
            src={result.thumbnail}
            alt={result.title || 'Видео'}
            className="w-32 h-24 object-cover rounded-xl"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate text-[var(--color-text-primary)]">
            {result.title || 'Видео'}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {result.platform} {result.duration ? `· ${formatDuration(result.duration)}` : ''}
            {result.fileSize ? ` · ${formatSize(result.fileSize)}` : ''}
          </p>
          {result.processingTime && (
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Обработано за {(result.processingTime / 1000).toFixed(1)} сек
            </p>
          )}
        </div>
      </div>

      {fileUrl && (
        <a
          href={fileUrl}
          download
          className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3
            rounded-xl bg-[var(--color-success)] hover:opacity-90
            text-white font-semibold text-lg transition-opacity"
        >
          Скачать {result.fileName?.endsWith('.mp3') ? 'аудио' : 'видео'}
        </a>
      )}
    </div>
  );
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}
