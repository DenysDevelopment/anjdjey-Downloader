import type { Context } from 'grammy';
import { customEmoji } from '../keyboards/custom-emoji';

export async function handleStart(ctx: Context) {
  const text =
    `${customEmoji('👋')} <b>Привет!</b> Я — бот ANJDJEY для скачивания видео.\n\n` +
    `${customEmoji('🔗')} Отправь мне ссылку на видео из:\n` +
    `${customEmoji('🎵')} TikTok\n` +
    `${customEmoji('▶️')} YouTube\n` +
    `${customEmoji('📸')} Instagram\n` +
    `${customEmoji('📘')} Facebook\n` +
    `${customEmoji('🐦')} Twitter / X\n` +
    `${customEmoji('📌')} Pinterest, Reddit, Vimeo\n\n` +
    `${customEmoji('✨')} Я скачаю видео и отправлю тебе!`;

  await ctx.reply(text, { parse_mode: 'HTML' });
}
