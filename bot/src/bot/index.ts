import { Bot, webhookCallback } from 'grammy';
import { env } from '../config/env';
import { handleStart } from './handlers/start';
import { handleHelp } from './handlers/help';
import { handleDownload } from './handlers/download';
import { handleCallback } from './handlers/callback';
import { rateLimitMiddleware } from './middleware/rate-limit';
import { loadIconPacks } from './keyboards/icon-pack';
import { logger } from '../utils/logger';
import express from 'express';

export const bot = new Bot(env.BOT_TOKEN);

// Middleware
bot.use(rateLimitMiddleware);

// Только приватные чаты
const pm = bot.chatType('private');
pm.command('start', handleStart);
pm.command('help', handleHelp);
pm.on('callback_query:data', handleCallback);
pm.on('message:text', handleDownload);

bot.catch((err) => {
  logger.error({ err: err.error }, 'Ошибка бота');
});

export function setupBotWebhook(app: express.Express) {
  if (env.BOT_MODE === 'webhook') {
    const webhookPath = `/api/bot/webhook/${env.WEBHOOK_SECRET}`;
    app.use(webhookPath, webhookCallback(bot, 'express'));
    logger.info(`Вебхук бота установлен: ${webhookPath}`);
  }
}

export async function startBot() {
  void loadIconPacks(bot);

  if (env.BOT_MODE === 'webhook' && env.WEBHOOK_DOMAIN) {
    await bot.api.setWebhook(
      `${env.WEBHOOK_DOMAIN}/api/bot/webhook/${env.WEBHOOK_SECRET}`,
    );
    logger.info('Вебхук бота зарегистрирован');
  } else if (env.BOT_MODE === 'webhook') {
    logger.info('Бот в режиме вебхука без домена — пропускаем запуск');
  } else {
    await bot.api.deleteWebhook();
    bot.start();
    logger.info('Бот запущен в режиме polling');
  }
}
