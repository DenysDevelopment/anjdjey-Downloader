'use client';

import { useState } from 'react';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  disabled?: boolean;
}

export function UrlInput({ onSubmit, disabled }: UrlInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (trimmed) {
      onSubmit(trimmed);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
      }
    } catch {
      // Clipboard API недоступен
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Вставьте ссылку на видео..."
          disabled={disabled}
          className="w-full px-6 py-4 pr-36 text-lg rounded-2xl
            bg-[var(--color-bg-input)] border border-[var(--color-border)]
            text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]
            focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_20px_var(--color-accent-glow)]
            transition-all duration-300 disabled:opacity-50"
        />
        <div className="absolute right-2 flex gap-2">
          <button
            type="button"
            onClick={handlePaste}
            disabled={disabled}
            className="px-3 py-2 text-sm rounded-xl
              text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
              hover:bg-[var(--color-border)] transition-colors disabled:opacity-50"
          >
            Вставить
          </button>
          <button
            type="submit"
            disabled={disabled || !url.trim()}
            className="px-5 py-2 text-sm font-semibold rounded-xl
              bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)]
              text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Скачать
          </button>
        </div>
      </div>
    </form>
  );
}
