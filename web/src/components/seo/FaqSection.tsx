'use client';

import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
        Часто задаваемые вопросы
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-[var(--color-border)] rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-6 py-4 text-left flex justify-between items-center
                bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-input)] transition-colors"
            >
              <span className="font-medium text-[var(--color-text-primary)]">
                {faq.q}
              </span>
              <span className="text-[var(--color-text-muted)] ml-4">
                {openIndex === i ? '−' : '+'}
              </span>
            </button>
            {openIndex === i && (
              <div className="px-6 py-4 bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] text-sm leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
