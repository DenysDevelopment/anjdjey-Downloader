'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { UrlInput } from '@/components/download/UrlInput';
import { DownloadCard } from '@/components/download/DownloadCard';
import { ProgressBar } from '@/components/download/ProgressBar';
import { HowItWorks } from '@/components/seo/HowItWorks';
import { PlatformFeatures } from '@/components/seo/PlatformFeatures';
import { FaqSection } from '@/components/seo/FaqSection';
import { useDownload } from '@/hooks/useDownload';

const HOME_FAQS = [
  {
    q: 'Какие платформы поддерживаются?',
    a: 'TikTok, YouTube, Instagram, Facebook, Twitter/X, Pinterest, Reddit, Vimeo, Likee и Threads.',
  },
  {
    q: 'Это бесплатно?',
    a: 'Да, сервис полностью бесплатный. Никакой регистрации не требуется.',
  },
  {
    q: 'Можно ли скачать видео из TikTok без водяного знака?',
    a: 'Да, мы скачиваем видео из TikTok без водяного знака в высоком качестве.',
  },
  {
    q: 'Можно ли скачать только аудио?',
    a: 'Да, вы можете выбрать формат MP3 для скачивания только аудио-дорожки.',
  },
  {
    q: 'Есть ли Telegram-бот?',
    a: 'Да, отправьте ссылку нашему Telegram-боту @anjdjey_bot и получите видео прямо в мессенджере.',
  },
  {
    q: 'Как долго хранятся файлы?',
    a: 'Скачанные файлы доступны в течение 2 часов, после чего автоматически удаляются.',
  },
];

export default function HomePage() {
  const { state, progress, result, error, download, reset } = useDownload();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-[var(--color-accent)]">ANJDJEY</span>
              <br />
              <span className="text-[var(--color-text-primary)]">
                Скачать видео бесплатно
              </span>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
              TikTok, YouTube, Instagram, Facebook и другие платформы.
              Без водяного знака, без регистрации, бесплатно.
            </p>

            <UrlInput
              onSubmit={(url) => download(url)}
              disabled={state === 'submitting' || state === 'processing'}
            />

            {(state === 'submitting' || state === 'processing') && (
              <ProgressBar progress={progress} status={state} />
            )}

            {state === 'completed' && result && (
              <DownloadCard result={result} />
            )}

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
        </section>

        <div className="max-w-6xl mx-auto px-4 pb-20">
          <HowItWorks />
          <PlatformFeatures />
          <FaqSection faqs={HOME_FAQS} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
