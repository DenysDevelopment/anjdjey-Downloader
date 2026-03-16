import type { Context } from 'grammy';

export async function handleStart(ctx: Context) {
  await ctx.reply(
    `Привет! Я — бот ANJDJEY для скачивания видео.\n\n` +
      `Отправь мне ссылку на видео из:\n` +
      `- TikTok\n` +
      `- YouTube\n` +
      `- Instagram\n` +
      `- Facebook\n` +
      `- Twitter/X\n` +
      `- Pinterest, Reddit, Vimeo\n\n` +
      `Я скачаю видео и отправлю тебе!`,
  );
}
