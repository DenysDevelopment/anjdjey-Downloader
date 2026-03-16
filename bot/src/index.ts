import { startBot } from './bot/index';
import { logger } from './utils/logger';

async function main() {
  logger.info('Запуск бота ANJDJEY...');
  await startBot();
}

main().catch((err) => {
  logger.error({ err }, 'Не удалось запустить бота');
  process.exit(1);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM, завершение бота...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT, завершение бота...');
  process.exit(0);
});
