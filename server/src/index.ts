import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { env } from './config/env';
import { prisma } from './config/database';
import { logger } from './utils/logger';
import apiRouter from './api/index';
import { errorHandler } from './api/middleware/errorHandler';
import { startDownloadWorker } from './infrastructure/queue/download.worker';
import { startCleanupCron, stopCleanupCron } from './application/services/cleanup.service';

// BigInt JSON сериализация
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const app = express();

app.set('trust proxy', 1);

// Middleware
app.use(
  cors({
    origin: env.NODE_ENV === 'production' ? ['https://anjdjey.com'] : true,
  }),
);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(pinoHttp({ logger }));

// Rate limiting
app.use(
  '/api/download',
  rateLimit({ windowMs: env.RATE_LIMIT_WINDOW_MS, max: env.RATE_LIMIT_MAX }),
);
app.use(
  '/api/metadata',
  rateLimit({ windowMs: env.RATE_LIMIT_WINDOW_MS, max: env.RATE_LIMIT_MAX * 2 }),
);

// API
app.use('/api', apiRouter);

// Health check
app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'ok',
      db: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch {
    res.status(503).json({
      status: 'error',
      db: 'disconnected',
      timestamp: new Date().toISOString(),
    });
  }
});

// Обработчик ошибок
app.use(errorHandler);

async function main() {
  await prisma.$connect();
  logger.info('База данных подключена');

  // Создаём директорию для загрузок
  const uploadDir = path.resolve(env.UPLOAD_DIR);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    logger.info(`Создана директория загрузок: ${uploadDir}`);
  }

  // Запускаем воркер скачивания
  const worker = startDownloadWorker();

  // Запускаем крон очистки файлов
  startCleanupCron(env.CLEANUP_INTERVAL_MINUTES);

  app.listen(env.PORT, () => {
    logger.info(`Сервер запущен на порту ${env.PORT}`);
  });
}

main().catch((err) => {
  logger.error({ err }, 'Не удалось запустить сервер');
  process.exit(1);
});

// Корректное завершение
process.on('SIGTERM', async () => {
  logger.info('SIGTERM, завершение...');
  stopCleanupCron();
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT, завершение...');
  stopCleanupCron();
  await prisma.$disconnect();
  process.exit(0);
});
