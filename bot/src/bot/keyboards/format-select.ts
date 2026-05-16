import { InlineKeyboard } from 'grammy';
import { applyIcon, withEmoji } from './icon-helpers';

export function buildFormatKeyboard(url: string): InlineKeyboard {
  const kb = new InlineKeyboard();

  applyIcon(kb.text(withEmoji('HD (лучшее)', '⭐'), `dl:BEST:${encodeURI(url)}`), '⭐');
  applyIcon(kb.text(withEmoji('720p', '🎬'), `dl:HD_720:${encodeURI(url)}`), '🎬');
  kb.row();
  applyIcon(kb.text(withEmoji('480p', '📱'), `dl:SD_480:${encodeURI(url)}`), '📱');
  applyIcon(kb.text(withEmoji('MP3', '🎵'), `dl:AUDIO_ONLY:${encodeURI(url)}`), '🎵');

  return kb;
}

export function parseCallbackData(data: string): { quality: string; url: string } | null {
  if (!data.startsWith('dl:')) return null;

  const parts = data.split(':');
  if (parts.length < 3) return null;

  return {
    quality: parts[1],
    url: decodeURI(parts.slice(2).join(':')),
  };
}
