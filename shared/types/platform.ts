export const Platform = {
  TIKTOK: 'TIKTOK',
  YOUTUBE: 'YOUTUBE',
  INSTAGRAM: 'INSTAGRAM',
  FACEBOOK: 'FACEBOOK',
  TWITTER: 'TWITTER',
  PINTEREST: 'PINTEREST',
  REDDIT: 'REDDIT',
  VIMEO: 'VIMEO',
  LIKEE: 'LIKEE',
  THREADS: 'THREADS',
  UNKNOWN: 'UNKNOWN',
} as const;
export type Platform = (typeof Platform)[keyof typeof Platform];

export const PLATFORM_LABELS: Record<Platform, string> = {
  [Platform.TIKTOK]: 'TikTok',
  [Platform.YOUTUBE]: 'YouTube',
  [Platform.INSTAGRAM]: 'Instagram',
  [Platform.FACEBOOK]: 'Facebook',
  [Platform.TWITTER]: 'X (Twitter)',
  [Platform.PINTEREST]: 'Pinterest',
  [Platform.REDDIT]: 'Reddit',
  [Platform.VIMEO]: 'Vimeo',
  [Platform.LIKEE]: 'Likee',
  [Platform.THREADS]: 'Threads',
  [Platform.UNKNOWN]: 'Неизвестно',
};

export const PLATFORM_ICONS: Record<Platform, string> = {
  [Platform.TIKTOK]: 'tiktok',
  [Platform.YOUTUBE]: 'youtube',
  [Platform.INSTAGRAM]: 'instagram',
  [Platform.FACEBOOK]: 'facebook',
  [Platform.TWITTER]: 'twitter',
  [Platform.PINTEREST]: 'pinterest',
  [Platform.REDDIT]: 'reddit',
  [Platform.VIMEO]: 'vimeo',
  [Platform.LIKEE]: 'likee',
  [Platform.THREADS]: 'threads',
  [Platform.UNKNOWN]: 'link',
};
