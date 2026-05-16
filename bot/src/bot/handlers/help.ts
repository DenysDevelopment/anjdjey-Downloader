import type { Context } from 'grammy';
import { customEmoji } from '../keyboards/custom-emoji';

export async function handleHelp(ctx: Context) {
  const text =
    `${customEmoji('📖')} <b>Как пользоваться:</b>\n\n` +
    `${customEmoji('1️⃣')} Скопируй ссылку на видео\n` +
    `${customEmoji('2️⃣')} Отправь её мне\n` +
    `${customEmoji('3️⃣')} Выбери качество\n` +
    `${customEmoji('4️⃣')} Получи видео!\n\n` +
    `${customEmoji('🌐')} <b>Платформы:</b>\n` +
    `TikTok, YouTube, Instagram, Facebook, Twitter/X, Pinterest, Reddit, Vimeo, Likee, Threads\n\n` +
    `${customEmoji('⚙️')} <b>Команды:</b>\n` +
    `/start — Приветствие\n` +
    `/help — Помощь`;

  await ctx.reply(text, { parse_mode: 'HTML' });
}
