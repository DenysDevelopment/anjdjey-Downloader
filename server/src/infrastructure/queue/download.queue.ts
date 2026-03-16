import { Queue } from 'bullmq';
import { redisConnection } from './connection';
import { JOB_ATTEMPTS, JOB_BACKOFF_DELAY } from '../../config/constants';

export interface DownloadJobData {
  downloadId: string;
  url: string;
  platform: string;
  quality: string;
}

export const downloadQueue = new Queue<DownloadJobData>('video-download', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: JOB_ATTEMPTS,
    backoff: { type: 'exponential', delay: JOB_BACKOFF_DELAY },
    removeOnComplete: { age: 3600 },
    removeOnFail: { age: 86400 },
  },
});
