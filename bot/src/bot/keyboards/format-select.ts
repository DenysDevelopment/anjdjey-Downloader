import { InlineKeyboard } from 'grammy';

export function buildFormatKeyboard(url: string): InlineKeyboard {
  const keyboard = new InlineKeyboard();

  keyboard
    .text('HD (лучшее)', `dl:BEST:${encodeURI(url)}`)
    .text('720p', `dl:HD_720:${encodeURI(url)}`)
    .row()
    .text('480p', `dl:SD_480:${encodeURI(url)}`)
    .text('MP3 (аудио)', `dl:AUDIO_ONLY:${encodeURI(url)}`);

  return keyboard;
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
