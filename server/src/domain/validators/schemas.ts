import { z } from 'zod';

export const schemas = {
  submitDownload: z.object({
    url: z.string().url().max(2048),
    quality: z
      .enum(['BEST', 'HD_1080', 'HD_720', 'SD_480', 'SD_360', 'AUDIO_ONLY'])
      .default('BEST'),
    source: z.enum(['WEB', 'TELEGRAM', 'API']).default('WEB'),
  }),

  extractMetadata: z.object({
    url: z.string().url().max(2048),
  }),

  jobIdParams: z.object({
    jobId: z.string().uuid(),
  }),

  fileIdParams: z.object({
    fileId: z.string().uuid(),
  }),
};
