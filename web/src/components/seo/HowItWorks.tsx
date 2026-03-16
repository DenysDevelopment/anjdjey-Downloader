const STEPS = [
  {
    number: '01',
    title: 'Скопируйте ссылку',
    description: 'Откройте видео в приложении или браузере и скопируйте ссылку.',
  },
  {
    number: '02',
    title: 'Вставьте ссылку',
    description: 'Вставьте скопированную ссылку в поле ввода на нашем сайте.',
  },
  {
    number: '03',
    title: 'Скачайте видео',
    description: 'Нажмите кнопку «Скачать» и выберите нужное качество. Готово!',
  },
];

export function HowItWorks() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
        Как это работает
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)]
              hover:border-[var(--color-accent)] transition-colors"
          >
            <span className="text-3xl font-bold text-[var(--color-accent)]">
              {step.number}
            </span>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mt-3 mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
