import type { InlineKeyboard, Keyboard } from 'grammy';
import { iconFor } from './icon-pack';

/** Лейбл без префикса-эмодзи если custom-иконка подцепится, иначе "🔥 Лейбл". */
export function withEmoji(label: string, emoji: string): string {
  return iconFor(emoji) ? label : `${emoji} ${label}`;
}

/** Прицепить custom-emoji иконку к последней добавленной кнопке клавиатуры. */
export function applyIcon<K extends InlineKeyboard | Keyboard>(kb: K, emoji: string): K {
  const id = iconFor(emoji);
  if (id) kb.icon(id);
  return kb;
}
