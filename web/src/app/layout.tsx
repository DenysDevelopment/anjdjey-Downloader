import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ANJDJEY — Скачать видео бесплатно',
    template: '%s | ANJDJEY',
  },
  description:
    'Бесплатный сервис скачивания видео из TikTok, YouTube, Instagram, Facebook без водяных знаков. Быстро и без регистрации.',
  keywords: [
    'скачать видео',
    'скачать тикток',
    'скачать из инстаграм',
    'скачать ютуб',
    'видео загрузчик',
    'без водяного знака',
    'ANJDJEY',
  ],
  openGraph: {
    title: 'ANJDJEY — Скачать видео бесплатно',
    description:
      'Скачивайте видео из TikTok, YouTube, Instagram, Facebook бесплатно и без водяных знаков.',
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
