import youtubeDl from 'youtube-dl-exec';
import { env } from '../../config/env';
import { getRandomUserAgent, YTDLP_TIMEOUT_MS } from '../../config/constants';
import { logger } from '../../utils/logger';
import type { VideoMetadata, FormatInfo } from '@shared/types/download';

export async function extractMetadata(
  url: string,
  proxy?: string,
): Promise<VideoMetadata> {
  const result = (await youtubeDl(url, {
    dumpJson: true,
    noWarnings: true,
    noCheckCertificates: true,
    preferFreeFormats: true,
    ...(proxy ? { proxy } : {}),
    userAgent: getRandomUserAgent(),
  })) as Record<string, unknown>;

  return mapToMetadata(result);
}

export async function downloadVideo(
  url: string,
  outputPath: string,
  quality: string,
  options?: { proxy?: string },
): Promise<{ filePath: string; fileSize: number }> {
  const formatString = qualityToFormat(quality);

  await youtubeDl(url, {
    output: outputPath,
    format: formatString,
    noWarnings: true,
    noCheckCertificates: true,
    mergeOutputFormat: quality === 'AUDIO_ONLY' ? undefined : 'mp4',
    extractAudio: quality === 'AUDIO_ONLY' ? true : undefined,
    audioFormat: quality === 'AUDIO_ONLY' ? 'mp3' : undefined,
    ...(options?.proxy ? { proxy: options.proxy } : {}),
    userAgent: getRandomUserAgent(),
  });

  const fs = await import('fs');
  const stats = fs.statSync(outputPath);

  return { filePath: outputPath, fileSize: stats.size };
}

function qualityToFormat(quality: string): string {
  switch (quality) {
    case 'HD_1080':
      return 'bestvideo[height<=1080]+bestaudio/best[height<=1080]';
    case 'HD_720':
      return 'bestvideo[height<=720]+bestaudio/best[height<=720]';
    case 'SD_480':
      return 'bestvideo[height<=480]+bestaudio/best[height<=480]';
    case 'SD_360':
      return 'bestvideo[height<=360]+bestaudio/best[height<=360]';
    case 'AUDIO_ONLY':
      return 'bestaudio/best';
    default:
      return 'bestvideo+bestaudio/best';
  }
}

function mapToMetadata(raw: Record<string, unknown>): VideoMetadata {
  const formats: FormatInfo[] = Array.isArray(raw.formats)
    ? raw.formats.map((f: Record<string, unknown>) => ({
        formatId: String(f.format_id || ''),
        ext: String(f.ext || ''),
        resolution: String(f.resolution || f.format_note || ''),
        filesize: typeof f.filesize === 'number' ? f.filesize : null,
        vcodec: String(f.vcodec || 'none'),
        acodec: String(f.acodec || 'none'),
      }))
    : [];

  return {
    title: String(raw.title || 'Без названия'),
    description: String(raw.description || ''),
    duration: typeof raw.duration === 'number' ? Math.round(raw.duration) : 0,
    thumbnail: String(raw.thumbnail || ''),
    uploader: String(raw.uploader || raw.channel || ''),
    viewCount: typeof raw.view_count === 'number' ? raw.view_count : 0,
    likeCount: typeof raw.like_count === 'number' ? raw.like_count : 0,
    resolution: String(raw.resolution || ''),
    formats,
  };
}
