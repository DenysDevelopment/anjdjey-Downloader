import { Platform } from '../types/platform';

const PLATFORM_PATTERNS: Record<Exclude<Platform, 'UNKNOWN'>, RegExp[]> = {
  [Platform.TIKTOK]: [
    /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[\w.-]+\/video\/\d+/i,
    /(?:https?:\/\/)?(?:vm|vt)\.tiktok\.com\/[\w]+/i,
    /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/t\/[\w]+/i,
  ],
  [Platform.YOUTUBE]: [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=[\w-]+/i,
    /(?:https?:\/\/)?youtu\.be\/[\w-]+/i,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/[\w-]+/i,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/[\w-]+/i,
    /(?:https?:\/\/)?music\.youtube\.com\/watch\?v=[\w-]+/i,
  ],
  [Platform.INSTAGRAM]: [
    /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|reels)\/[\w-]+/i,
    /(?:https?:\/\/)?(?:www\.)?instagram\.com\/stories\/[\w.-]+\/\d+/i,
  ],
  [Platform.FACEBOOK]: [
    /(?:https?:\/\/)?(?:www\.)?facebook\.com\/[\w.-]+\/videos\/\d+/i,
    /(?:https?:\/\/)?(?:www\.)?facebook\.com\/watch\/?.*v=\d+/i,
    /(?:https?:\/\/)?(?:www\.)?facebook\.com\/reel\/\d+/i,
    /(?:https?:\/\/)?fb\.watch\/[\w]+/i,
  ],
  [Platform.TWITTER]: [
    /(?:https?:\/\/)?(?:www\.)?(?:twitter|x)\.com\/[\w]+\/status\/\d+/i,
  ],
  [Platform.PINTEREST]: [
    /(?:https?:\/\/)?(?:www\.)?pinterest\.com\/pin\/[\w-]+/i,
    /(?:https?:\/\/)?pin\.it\/[\w]+/i,
  ],
  [Platform.REDDIT]: [
    /(?:https?:\/\/)?(?:www\.)?reddit\.com\/r\/[\w]+\/comments\/[\w]+/i,
  ],
  [Platform.VIMEO]: [
    /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/\d+/i,
  ],
  [Platform.LIKEE]: [
    /(?:https?:\/\/)?(?:www\.)?likee\.video\/[\w-]+/i,
    /(?:https?:\/\/)?l\.likee\.video\/[\w]+/i,
  ],
  [Platform.THREADS]: [
    /(?:https?:\/\/)?(?:www\.)?threads\.net\/@[\w.-]+\/post\/[\w]+/i,
  ],
};

export function detectPlatform(url: string): Platform {
  for (const [platform, patterns] of Object.entries(PLATFORM_PATTERNS)) {
    if (patterns.some((re) => re.test(url))) {
      return platform as Platform;
    }
  }
  return Platform.UNKNOWN;
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isSupportedPlatform(url: string): boolean {
  return detectPlatform(url) !== Platform.UNKNOWN;
}
