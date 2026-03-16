import type { Context } from 'grammy';

export async function handleHelp(ctx: Context) {
  await ctx.reply(
    `Как пользоваться:\n\n` +
      `1. Скопируй ссылку на видео\n` +
      `2. Отправь её мне\n` +
      `3. Выбери качество\n` +
      `4. Получи видео!\n\n` +
      `Поддерживаемые платформы:\n` +
      `TikTok, YouTube, Instagram, Facebook, Twitter/X, Pinterest, Reddit, Vimeo, Likee, Threads\n\n` +
      `Команды:\n` +
      `/start — Приветствие\n` +
      `/help — Помощь`,
  );
}
