export interface SeoPage {
  slug: string;
  title: string;
  h1: string;
  description: string;
  platform: string;
  intro: string;
  features: string[];
  faqs: { q: string; a: string }[];
  relatedPages: string[];
}

export const seoPages: SeoPage[] = [
  {
    slug: 'download-tiktok-video',
    title: 'Скачать видео из TikTok бесплатно — без водяного знака',
    h1: 'Скачать видео из TikTok без водяного знака',
    description:
      'Бесплатный онлайн-загрузчик видео из TikTok. Скачивайте видео без водяного знака в HD качестве. Быстро и без регистрации.',
    platform: 'TikTok',
    intro:
      'ANJDJEY позволяет скачивать видео из TikTok без водяного знака в высоком качестве. Просто вставьте ссылку на видео и нажмите кнопку «Скачать». Наш сервис автоматически удаляет водяной знак TikTok, чтобы вы получили чистое видео.',
    features: [
      'Скачивание без водяного знака',
      'HD качество видео',
      'Поддержка коротких ссылок (vm.tiktok.com)',
      'Скачивание аудио в формате MP3',
      'Работает на телефоне и компьютере',
      'Не требует регистрации',
    ],
    faqs: [
      {
        q: 'Как скачать видео из TikTok без водяного знака?',
        a: 'Скопируйте ссылку на видео в TikTok, вставьте её в поле ввода на нашем сайте и нажмите «Скачать». Видео будет автоматически скачано без водяного знака.',
      },
      {
        q: 'Можно ли скачать приватное видео из TikTok?',
        a: 'Нет, мы можем скачать только публичные видео, доступные по ссылке.',
      },
      {
        q: 'Какое максимальное качество видео?',
        a: 'Мы скачиваем видео в максимальном доступном качестве, обычно это 1080p HD.',
      },
      {
        q: 'Можно ли скачать только музыку из TikTok?',
        a: 'Да, выберите формат MP3 при скачивании, чтобы получить только аудио-дорожку.',
      },
    ],
    relatedPages: [
      'download-tiktok-video-without-watermark',
      'download-instagram-reels',
      'download-youtube-video',
    ],
  },
  {
    slug: 'download-tiktok-video-without-watermark',
    title: 'TikTok без водяного знака — скачать видео онлайн',
    h1: 'Скачать TikTok без водяного знака',
    description:
      'Скачивайте видео из TikTok без водяного знака бесплатно. HD качество, без регистрации, мгновенная загрузка.',
    platform: 'TikTok',
    intro:
      'Наш сервис автоматически удаляет водяной знак TikTok при скачивании видео. Вы получаете чистое видео в оригинальном качестве без логотипа TikTok.',
    features: [
      'Автоматическое удаление водяного знака',
      'Оригинальное качество видео',
      'Быстрая обработка — менее 3 секунд',
      'Поддержка всех типов ссылок TikTok',
      'Бесплатно и без ограничений',
    ],
    faqs: [
      {
        q: 'Как удалить водяной знак с видео TikTok?',
        a: 'Просто вставьте ссылку на видео в наш сервис — водяной знак будет удалён автоматически.',
      },
      {
        q: 'Теряется ли качество при удалении водяного знака?',
        a: 'Нет, мы скачиваем оригинальную версию видео без водяного знака, поэтому качество не теряется.',
      },
    ],
    relatedPages: ['download-tiktok-video', 'download-instagram-reels'],
  },
  {
    slug: 'download-youtube-video',
    title: 'Скачать видео с YouTube бесплатно — ANJDJEY',
    h1: 'Скачать видео с YouTube',
    description:
      'Бесплатный загрузчик видео с YouTube. Скачивайте видео, Shorts и музыку в HD, Full HD и MP3.',
    platform: 'YouTube',
    intro:
      'Скачивайте видео с YouTube в любом качестве — от 360p до 1080p. Поддерживаются обычные видео, Shorts, и конвертация в MP3 для прослушивания музыки офлайн.',
    features: [
      'Выбор качества: 360p, 480p, 720p, 1080p',
      'Конвертация в MP3',
      'Поддержка YouTube Shorts',
      'Поддержка плейлистов (скоро)',
      'Быстрое скачивание через CDN',
    ],
    faqs: [
      {
        q: 'Как скачать видео с YouTube?',
        a: 'Скопируйте ссылку на видео YouTube, вставьте её в поле ввода и выберите нужное качество.',
      },
      {
        q: 'Можно ли скачать видео с YouTube в MP3?',
        a: 'Да, выберите формат «Только аудио (MP3)» при скачивании.',
      },
      {
        q: 'Можно ли скачать YouTube Shorts?',
        a: 'Да, просто вставьте ссылку на Shorts — он будет скачан как обычное видео.',
      },
    ],
    relatedPages: [
      'download-youtube-to-mp3',
      'download-tiktok-video',
      'download-instagram-reels',
    ],
  },
  {
    slug: 'download-youtube-to-mp3',
    title: 'YouTube в MP3 — конвертер и загрузчик',
    h1: 'Скачать YouTube в MP3',
    description:
      'Конвертируйте видео с YouTube в MP3 бесплатно. Высокое качество аудио, быстрая конвертация.',
    platform: 'YouTube',
    intro:
      'Конвертируйте любое видео с YouTube в аудиофайл MP3 высокого качества. Идеально для прослушивания музыки, подкастов и лекций офлайн.',
    features: [
      'Высокое качество аудио (320 kbps)',
      'Быстрая конвертация',
      'Поддержка длинных видео',
      'Скачивание без регистрации',
    ],
    faqs: [
      {
        q: 'Как конвертировать YouTube в MP3?',
        a: 'Вставьте ссылку на видео YouTube и выберите формат «Только аудио (MP3)».',
      },
      {
        q: 'Какое качество MP3?',
        a: 'Мы извлекаем аудио в максимальном доступном качестве, обычно до 320 kbps.',
      },
    ],
    relatedPages: ['download-youtube-video', 'download-tiktok-video'],
  },
  {
    slug: 'download-instagram-reels',
    title: 'Скачать Reels из Instagram бесплатно — ANJDJEY',
    h1: 'Скачать Reels из Instagram',
    description:
      'Скачивайте Instagram Reels, Stories и публикации бесплатно в HD качестве. Без регистрации.',
    platform: 'Instagram',
    intro:
      'Скачивайте Reels, Stories и видео-публикации из Instagram в высоком качестве. Наш сервис поддерживает все типы контента Instagram.',
    features: [
      'Скачивание Instagram Reels',
      'Скачивание Stories (по ссылке)',
      'Скачивание видео из публикаций',
      'HD качество',
      'Быстрая обработка',
    ],
    faqs: [
      {
        q: 'Как скачать Reels из Instagram?',
        a: 'Откройте Reels в Instagram, нажмите «Поделиться» → «Копировать ссылку», вставьте ссылку в наш сервис.',
      },
      {
        q: 'Можно ли скачать приватные публикации?',
        a: 'Нет, мы можем скачать только публичный контент.',
      },
    ],
    relatedPages: [
      'download-tiktok-video',
      'download-youtube-video',
      'download-facebook-video',
    ],
  },
  {
    slug: 'download-facebook-video',
    title: 'Скачать видео из Facebook бесплатно — ANJDJEY',
    h1: 'Скачать видео из Facebook',
    description:
      'Бесплатный загрузчик видео из Facebook. HD качество, быстрое скачивание без регистрации.',
    platform: 'Facebook',
    intro:
      'Скачивайте видео из Facebook в высоком качестве. Поддерживаются обычные видео, Reels и видео со страниц.',
    features: [
      'Скачивание видео из лент',
      'Поддержка Facebook Reels',
      'HD качество',
      'Скачивание по ссылке fb.watch',
    ],
    faqs: [
      {
        q: 'Как скачать видео из Facebook?',
        a: 'Скопируйте ссылку на видео из Facebook и вставьте её в поле ввода на нашем сайте.',
      },
      {
        q: 'Поддерживаются ли видео из групп Facebook?',
        a: 'Да, если видео доступно по публичной ссылке.',
      },
    ],
    relatedPages: [
      'download-instagram-reels',
      'download-tiktok-video',
      'download-youtube-video',
    ],
  },
  {
    slug: 'download-twitter-video',
    title: 'Скачать видео из Twitter/X бесплатно',
    h1: 'Скачать видео из Twitter/X',
    description:
      'Скачивайте видео из твитов Twitter/X в HD качестве. Быстро и бесплатно.',
    platform: 'Twitter/X',
    intro:
      'Скачивайте видео из твитов в высоком качестве. Поддерживаются ссылки как с twitter.com, так и с x.com.',
    features: [
      'Поддержка twitter.com и x.com',
      'HD качество видео',
      'Скачивание GIF',
      'Быстрая обработка',
    ],
    faqs: [
      {
        q: 'Как скачать видео из Twitter?',
        a: 'Скопируйте ссылку на твит с видео и вставьте в наш сервис.',
      },
    ],
    relatedPages: [
      'download-tiktok-video',
      'download-instagram-reels',
      'download-youtube-video',
    ],
  },
  {
    slug: 'download-pinterest-video',
    title: 'Скачать видео из Pinterest бесплатно',
    h1: 'Скачать видео из Pinterest',
    description: 'Бесплатный загрузчик видео-пинов из Pinterest. HD качество.',
    platform: 'Pinterest',
    intro: 'Скачивайте видео-пины из Pinterest в высоком качестве.',
    features: [
      'Скачивание видео-пинов',
      'Поддержка коротких ссылок pin.it',
      'HD качество',
    ],
    faqs: [
      {
        q: 'Как скачать видео из Pinterest?',
        a: 'Скопируйте ссылку на пин с видео и вставьте в поле ввода.',
      },
    ],
    relatedPages: ['download-instagram-reels', 'download-tiktok-video'],
  },
  {
    slug: 'download-vimeo-video',
    title: 'Скачать видео с Vimeo бесплатно',
    h1: 'Скачать видео с Vimeo',
    description: 'Скачивайте видео с Vimeo в HD качестве бесплатно.',
    platform: 'Vimeo',
    intro: 'Скачивайте публичные видео с Vimeo в высоком качестве.',
    features: ['HD/4K качество', 'Быстрое скачивание', 'Выбор разрешения'],
    faqs: [
      {
        q: 'Можно ли скачать приватное видео с Vimeo?',
        a: 'Нет, скачивание доступно только для публичных видео.',
      },
    ],
    relatedPages: ['download-youtube-video', 'download-facebook-video'],
  },
  {
    slug: 'download-reddit-video',
    title: 'Скачать видео из Reddit бесплатно',
    h1: 'Скачать видео из Reddit',
    description: 'Скачивайте видео из постов Reddit с аудио в HD качестве.',
    platform: 'Reddit',
    intro:
      'Скачивайте видео из Reddit вместе с аудио. Reddit хранит видео и аудио отдельно — мы автоматически объединяем их.',
    features: [
      'Видео + аудио вместе',
      'Автоматическое объединение потоков',
      'HD качество',
    ],
    faqs: [
      {
        q: 'Почему видео из Reddit скачивается без звука?',
        a: 'Наш сервис автоматически объединяет видео и аудио потоки Reddit, поэтому звук будет присутствовать.',
      },
    ],
    relatedPages: ['download-youtube-video', 'download-twitter-video'],
  },
];

export function getSeoPage(slug: string): SeoPage | undefined {
  return seoPages.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return seoPages.map((p) => p.slug);
}
