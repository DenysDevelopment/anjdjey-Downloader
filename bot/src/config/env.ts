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
  BOT_TOKEN: z.string(),
  BOT_MODE: z.enum(['webhook', 'polling']).default('polling'),
  WEBHOOK_DOMAIN: z.string().optional().default(''),
  WEBHOOK_SECRET: z.string().optional().default('webhook-secret'),
  API_BASE_URL: z.string().default('http://localhost:3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Ошибка переменных окружения бота:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
