const PLATFORMS = [
  {
    name: 'TikTok',
    description: 'Скачивайте видео из TikTok без водяного знака в HD качестве.',
    href: '/download-tiktok-video',
  },
  {
    name: 'YouTube',
    description: 'Скачивайте видео и Shorts из YouTube в любом качестве, включая MP3.',
    href: '/download-youtube-video',
  },
  {
    name: 'Instagram',
    description: 'Скачивайте Reels, Stories и публикации из Instagram.',
    href: '/download-instagram-reels',
  },
  {
    name: 'Facebook',
    description: 'Скачивайте видео из Facebook в HD качестве.',
    href: '/download-facebook-video',
  },
  {
    name: 'Twitter/X',
    description: 'Скачивайте видео из твитов в высоком качестве.',
    href: '/download-twitter-video',
  },
  {
    name: 'Pinterest',
    description: 'Скачивайте видео-пины из Pinterest.',
    href: '/download-pinterest-video',
  },
];

export function PlatformFeatures() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
        Поддерживаемые платформы
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLATFORMS.map((p) => (
          <a
            key={p.name}
            href={p.href}
            className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)]
              hover:border-[var(--color-accent)] hover:shadow-[0_0_20px_var(--color-accent-glow)]
              transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
              {p.name}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2">
              {p.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
