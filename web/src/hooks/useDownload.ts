'use client';

import { useState, useCallback, useRef } from 'react';
import { submitDownload, getDownloadStatus, getFileUrl } from '@/lib/api';
import type { StatusResponse } from '@/lib/api';

type DownloadState = 'idle' | 'submitting' | 'processing' | 'completed' | 'error';

export function useDownload() {
  const [state, setState] = useState<DownloadState>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<StatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const download = useCallback(
    async (url: string, quality: string = 'BEST') => {
      stopPolling();
      setState('submitting');
      setProgress(0);
      setResult(null);
      setError(null);

      try {
        const submitResult = await submitDownload(url, quality);

        if (submitResult.status === 'COMPLETED' && submitResult.fileId) {
          const status = await getDownloadStatus(submitResult.jobId);
          setResult(status);
          setState('completed');
          return;
        }

        setState('processing');

        // Поллинг статуса
        const jobId = submitResult.jobId;
        pollRef.current = setInterval(async () => {
          try {
            const status = await getDownloadStatus(jobId);

            if (status.progress) {
              setProgress(status.progress);
            }

            if (status.status === 'COMPLETED') {
              setResult(status);
              setState('completed');
              stopPolling();
            } else if (status.status === 'FAILED') {
              setError(status.errorMessage || 'Не удалось скачать видео');
              setState('error');
              stopPolling();
            }
          } catch {
            setError('Ошибка соединения');
            setState('error');
            stopPolling();
          }
        }, 2000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        setState('error');
      }
    },
    [stopPolling],
  );

  const reset = useCallback(() => {
    stopPolling();
    setState('idle');
    setProgress(0);
    setResult(null);
    setError(null);
  }, [stopPolling]);

  return { state, progress, result, error, download, reset, getFileUrl };
}
