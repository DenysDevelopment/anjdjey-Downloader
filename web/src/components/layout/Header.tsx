import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[var(--color-accent)]">
          ANJDJEY
        </Link>
        <nav className="flex gap-6 text-sm text-[var(--color-text-secondary)]">
          <Link href="/download-tiktok-video" className="hover:text-[var(--color-text-primary)] transition-colors">
            TikTok
          </Link>
          <Link href="/download-youtube-video" className="hover:text-[var(--color-text-primary)] transition-colors">
            YouTube
          </Link>
          <Link href="/download-instagram-reels" className="hover:text-[var(--color-text-primary)] transition-colors">
            Instagram
          </Link>
          <Link href="/download-facebook-video" className="hover:text-[var(--color-text-primary)] transition-colors">
            Facebook
          </Link>
        </nav>
      </div>
    </header>
  );
}
