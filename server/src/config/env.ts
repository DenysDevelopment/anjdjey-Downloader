import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

const envPaths = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '../.env'),
  path.resolve(__dirname, '../../../.env'),
  path.resolve(__dirname, '../../.env'),
];
for (const p of envPaths) {
  dotenv.config({ path: p });
}

const envSchema = z.object({
  DATABASE_URL: z.string(),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  UPLOAD_DIR: z.string().default('./downloads'),
  YTDLP_PATH: z.string().default('yt-dlp'),
  YTDLP_COOKIES_DIR: z.string().default('./cookies'),
  PROXY_ENABLED: z
    .string()
    .default('false')
    .transform((v) => v === 'true'),
  FILE_TTL_HOURS: z.coerce.number().default(2),
  CLEANUP_INTERVAL_MINUTES: z.coerce.number().default(30),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  RATE_LIMIT_MAX: z.coerce.number().default(30),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Ошибка переменных окружения:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
