import type { Bot } from 'grammy';
import { logger } from '../../utils/logger';

const ICON_PACK_NAMES = [
  'AnimatedEmojies',
  'OutlineEmoji',
  'tgiosicons',
  'TgAndroidIcons',
] as const;

let iconByEmoji = new Map<string, string>();
let loadPromise: Promise<void> | null = null;

export async function loadIconPacks(bot: Bot): Promise<void> {
  if (loadPromise) return loadPromise;
  loadPromise = (async () => {
    const next = new Map<string, string>();
    for (const name of ICON_PACK_NAMES) {
      try {
        const set = await bot.api.getStickerSet(name);
        let added = 0;
        for (const s of set.stickers) {
          if (s.type !== 'custom_emoji' || !s.custom_emoji_id) continue;
          const key = s.emoji ?? '';
          if (!key || next.has(key)) continue;
          next.set(key, s.custom_emoji_id);
          added++;
        }
        logger.info({ name, total: set.stickers.length, added }, 'icon pack loaded');
      } catch (err) {
        logger.warn({ name, err: (err as Error).message }, 'icon pack failed');
      }
    }
    iconByEmoji = next;
    logger.info({ totalIcons: next.size }, 'icon packs ready');
  })();
  return loadPromise;
}

export function iconFor(emoji: string): string | undefined {
  return iconByEmoji.get(emoji);
}
