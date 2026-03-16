import type { Context, NextFunction } from 'grammy';

const userRequests = new Map<number, { count: number; resetAt: number }>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

export async function rateLimitMiddleware(ctx: Context, next: NextFunction) {
  const userId = ctx.from?.id;
  if (!userId) return next();

  const now = Date.now();
  const entry = userRequests.get(userId);

  if (!entry || now > entry.resetAt) {
    userRequests.set(userId, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }

  if (entry.count >= MAX_REQUESTS) {
    await ctx.reply('Слишком много запросов. Подождите минуту.');
    return;
  }

  entry.count++;
  return next();
}

// Очистка каждые 5 минут
setInterval(() => {
  const now = Date.now();
  for (const [userId, entry] of userRequests) {
    if (now > entry.resetAt) {
      userRequests.delete(userId);
    }
  }
}, 5 * 60_000);
