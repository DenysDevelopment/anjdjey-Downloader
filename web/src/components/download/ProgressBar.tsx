'use client';

interface ProgressBarProps {
  progress: number;
  status: string;
}

const STATUS_MESSAGES: Record<string, string> = {
  submitting: 'Отправляем запрос...',
  processing: 'Скачиваем видео...',
};

export function ProgressBar({ progress, status }: ProgressBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-[var(--color-text-secondary)]">
          {STATUS_MESSAGES[status] || 'Обработка...'}
        </span>
        <span className="text-sm text-[var(--color-text-secondary)]">{progress}%</span>
      </div>
      <div className="w-full h-3 rounded-full bg-[var(--color-bg-input)] overflow-hidden">
        <div
          className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-500 ease-out"
          style={{ width: `${Math.max(progress, 5)}%` }}
        />
      </div>
    </div>
  );
}
