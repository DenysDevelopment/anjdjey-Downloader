'use client';

import { UrlInput } from '@/components/download/UrlInput';
import { DownloadCard } from '@/components/download/DownloadCard';
import { ProgressBar } from '@/components/download/ProgressBar';
import { useDownload } from '@/hooks/useDownload';

export function SeoPageDownloader() {
  const { state, progress, result, error, download, reset } = useDownload();

  return (
    <div>
      <UrlInput
        onSubmit={(url) => download(url)}
        disabled={state === 'submitting' || state === 'processing'}
      />

      {(state === 'submitting' || state === 'processing') && (
        <ProgressBar progress={progress} status={state} />
      )}

      {state === 'completed' && result && <DownloadCard result={result} />}

      {state === 'error' && error && (
        <div className="w-full max-w-2xl mx-auto mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <p className="text-[var(--color-error)]">{error}</p>
          <button
            onClick={reset}
            className="mt-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            Попробовать снова
          </button>
        </div>
      )}

      {state === 'completed' && (
        <button
          onClick={reset}
          className="mt-4 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
        >
          Скачать другое видео
        </button>
      )}
    </div>
  );
}
