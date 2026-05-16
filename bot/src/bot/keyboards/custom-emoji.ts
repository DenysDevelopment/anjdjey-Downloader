import { iconFor } from './icon-pack';

export function htmlEscape(s: string): string {
  return s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!);
}

export function customEmoji(emoji: string): string {
  const id = iconFor(emoji);
  return id ? `<tg-emoji emoji-id="${id}">${emoji}</tg-emoji>` : emoji;
}

const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu;

export function wrapAllEmojis(text: string): string {
  return htmlEscape(text).replace(EMOJI_RE, (e) => {
    const id = iconFor(e);
    return id ? `<tg-emoji emoji-id="${id}">${e}</tg-emoji>` : e;
  });
}
