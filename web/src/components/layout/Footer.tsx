import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-[var(--color-accent)] mb-4">ANJDJEY</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Бесплатный сервис скачивания видео из социальных сетей.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">Загрузчики</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li><Link href="/download-tiktok-video" className="hover:text-[var(--color-text-primary)]">TikTok</Link></li>
              <li><Link href="/download-youtube-video" className="hover:text-[var(--color-text-primary)]">YouTube</Link></li>
              <li><Link href="/download-instagram-reels" className="hover:text-[var(--color-text-primary)]">Instagram</Link></li>
              <li><Link href="/download-facebook-video" className="hover:text-[var(--color-text-primary)]">Facebook</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">Ещё</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li><Link href="/download-twitter-video" className="hover:text-[var(--color-text-primary)]">Twitter/X</Link></li>
              <li><Link href="/download-pinterest-video" className="hover:text-[var(--color-text-primary)]">Pinterest</Link></li>
              <li><Link href="/download-vimeo-video" className="hover:text-[var(--color-text-primary)]">Vimeo</Link></li>
              <li><Link href="/download-reddit-video" className="hover:text-[var(--color-text-primary)]">Reddit</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">Полезное</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li><Link href="/download-tiktok-video-without-watermark" className="hover:text-[var(--color-text-primary)]">TikTok без водяного знака</Link></li>
              <li><Link href="/download-youtube-to-mp3" className="hover:text-[var(--color-text-primary)]">YouTube в MP3</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--color-border)] text-center text-sm text-[var(--color-text-muted)]">
          ANJDJEY &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
