import fetch from 'node-fetch';
import { InputFile } from 'grammy';
import { apiClient } from './api-client';
import { logger } from '../utils/logger';
import type { Context } from 'grammy';

const TELEGRAM_FILE_LIMIT = 50 * 1024 * 1024; // 50 МБ

export async function sendFileToUser(
  ctx: Context,
  fileId: string,
  fileName: string,
  fileSize?: number,
  mimeType?: string,
): Promise<void> {
  if (fileSize && fileSize > TELEGRAM_FILE_LIMIT) {
    const url = apiClient.getFileUrl(fileId);
    await ctx.reply(
      `Файл слишком большой для отправки через Telegram (${formatSize(fileSize)}).\n\nСкачайте по ссылке: ${url}`,
    );
    return;
  }

  const url = apiClient.getFileUrl(fileId);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Не удалось скачать файл: ${response.status}`);
  }

  const buffer = await response.buffer();
  const inputFile = new InputFile(buffer, fileName);

  if (mimeType?.startsWith('audio/')) {
    await ctx.replyWithAudio(inputFile, {
      caption: `${fileName}`,
    });
  } else {
    await ctx.replyWithVideo(inputFile, {
      caption: `${fileName}`,
      supports_streaming: true,
    });
  }
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}
