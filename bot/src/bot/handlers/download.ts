import type { Context } from 'grammy';
import { detectPlatform, isValidUrl } from '@shared/utils/platform-detector';
import { Platform, PLATFORM_LABELS } from '@shared/types/platform';
import { buildFormatKeyboard } from '../keyboards/format-select';
import { logger } from '../../utils/logger';

export async function handleDownload(ctx: Context) {
  const text = ctx.message?.text?.trim();
  if (!text) return;

  // Проверяем что это ссылка
  if (!isValidUrl(text)) return;

  const platform = detectPlatform(text);
  if (platform === Platform.UNKNOWN) {
    await ctx.reply(
      'Эта ссылка не поддерживается.\n\n' +
        'Отправь ссылку из: TikTok, YouTube, Instagram, Facebook, Twitter/X, Pinterest, Reddit, Vimeo.',
    );
    return;
  }

  const platformName = PLATFORM_LABELS[platform];

  await ctx.reply(`${platformName} — выберите качество:`, {
    reply_markup: buildFormatKeyboard(text),
  });

  logger.info({ platform, userId: ctx.from?.id }, 'Пользователь отправил ссылку');
}
