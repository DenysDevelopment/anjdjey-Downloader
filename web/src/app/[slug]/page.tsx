import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSeoPage, getAllSlugs } from '@/lib/seo-pages';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FaqSection } from '@/components/seo/FaqSection';
import { HowItWorks } from '@/components/seo/HowItWorks';
import { SeoPageDownloader } from './SeoPageDownloader';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'website',
      locale: 'ru_RU',
    },
  };
}

export default async function SeoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `ANJDJEY — ${page.platform} загрузчик`,
    description: page.description,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="flex-1">
        {/* Hero с загрузчиком */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-text-primary)]">
              {page.h1}
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
              {page.intro}
            </p>

            <SeoPageDownloader />
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 pb-20">
          {/* Возможности */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
              Возможности
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {page.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]"
                >
                  <span className="text-[var(--color-success)] mt-0.5">&#10003;</span>
                  <span className="text-[var(--color-text-secondary)]">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <HowItWorks />

          <FaqSection faqs={page.faqs} />

          {/* Связанные страницы */}
          {page.relatedPages.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                Смотрите также
              </h2>
              <div className="flex flex-wrap gap-3">
                {page.relatedPages.map((relatedSlug) => {
                  const related = getSeoPage(relatedSlug);
                  if (!related) return null;
                  return (
                    <Link
                      key={relatedSlug}
                      href={`/${relatedSlug}`}
                      className="px-4 py-2 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]
                        text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]
                        hover:border-[var(--color-accent)] transition-colors"
                    >
                      {related.h1}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
