export const WORKER_CONCURRENCY = 5;
export const WORKER_RATE_LIMIT = { max: 50, duration: 60_000 };

export const JOB_ATTEMPTS = 3;
export const JOB_BACKOFF_DELAY = 5000;

export const YTDLP_TIMEOUT_MS = 120_000;

export const TELEGRAM_FILE_SIZE_LIMIT = 50 * 1024 * 1024; // 50 МБ

export const METADATA_CACHE_TTL = 3600; // 1 час в секундах
export const DOWNLOAD_CACHE_TTL = 7200; // 2 часа в секундах

export const USER_AGENTS = [
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
  'Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
];

export function getRandomUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}
