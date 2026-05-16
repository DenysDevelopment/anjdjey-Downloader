import type { Context } from 'grammy';
import { parseCallbackData } from '../keyboards/format-select';
import { customEmoji, htmlEscape } from '../keyboards/custom-emoji';
import { apiClient } from '../../services/api-client';
import { sendFileToUser } from '../../services/file-sender';
import { logger } from '../../utils/logger';

const POLL_INTERVAL = 2000;
const MAX_POLLS = 60; // Максимум 2 минуты ожидания

export async function handleCallback(ctx: Context) {
  const data = ctx.callbackQuery?.data;
  if (!data) return;

  const parsed = parseCallbackData(data);
  if (!parsed) return;

  await ctx.answerCallbackQuery({ text: 'Начинаю скачивание...' });

  await ctx.editMessageText(
    `${customEmoji('⏳')} Скачиваю видео в качестве <b>${htmlEscape(qualityLabel(parsed.quality))}</b>...\n` +
      `Это может занять некоторое время.`,
    { parse_mode: 'HTML' },
  );

  try {
    // Отправляем запрос на скачивание
    const submitResult = await apiClient.submitDownload(
      parsed.url,
      parsed.quality,
      ctx.from?.id,
    );

    // Если из кэша — сразу отправляем
    if (submitResult.status === 'COMPLETED' && submitResult.fileId) {
      await ctx.editMessageText(`${customEmoji('⚡')} Файл найден в кэше! Отправляю...`, {
        parse_mode: 'HTML',
      });
      const status = await apiClient.getStatus(submitResult.jobId);
      await sendFileToUser(
        ctx,
        submitResult.fileId,
        status.fileName || 'video.mp4',
        status.fileSize,
        status.fileName?.endsWith('.mp3') ? 'audio/mpeg' : 'video/mp4',
      );
      return;
    }

    // Ждём завершения скачивания
    let polls = 0;
    while (polls < MAX_POLLS) {
      await sleep(POLL_INTERVAL);
      const status = await apiClient.getStatus(submitResult.jobId);

      if (status.status === 'COMPLETED' && status.fileId) {
        await ctx.editMessageText(
          `${customEmoji('✅')} Скачивание завершено! Отправляю файл...`,
          { parse_mode: 'HTML' },
        );
        await sendFileToUser(
          ctx,
          status.fileId,
          status.fileName || 'video.mp4',
          status.fileSize,
          status.fileName?.endsWith('.mp3') ? 'audio/mpeg' : 'video/mp4',
        );
        return;
      }

      if (status.status === 'FAILED') {
        await ctx.editMessageText(
          `${customEmoji('❌')} Не удалось скачать видео.\n\n` +
            `Причина: ${htmlEscape(status.errorMessage || 'Неизвестная ошибка')}`,
          { parse_mode: 'HTML' },
        );
        return;
      }

      // Обновляем прогресс
      if (status.progress && polls % 3 === 0) {
        await ctx
          .editMessageText(`${customEmoji('⏳')} Скачиваю... ${status.progress}%`, {
            parse_mode: 'HTML',
          })
          .catch(() => {});
      }

      polls++;
    }

    await ctx.editMessageText(
      `${customEmoji('⌛')} Превышено время ожидания. Попробуйте ещё раз.`,
      { parse_mode: 'HTML' },
    );
  } catch (err) {
    logger.error({ err, url: parsed.url }, 'Ошибка в callback');
    await ctx
      .editMessageText(`${customEmoji('❌')} Произошла ошибка. Попробуйте ещё раз.`, {
        parse_mode: 'HTML',
      })
      .catch(() => {});
  }
}

function qualityLabel(quality: string): string {
  const labels: Record<string, string> = {
    BEST: 'HD (лучшее)',
    HD_1080: '1080p',
    HD_720: '720p',
    SD_480: '480p',
    SD_360: '360p',
    AUDIO_ONLY: 'MP3',
  };
  return labels[quality] || quality;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
