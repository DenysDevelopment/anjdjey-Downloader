import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../utils/errors';
import { logger } from '../../utils/logger';

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    logger.warn({ err, path: req.path, method: req.method }, err.message);
    res.status(err.statusCode).json({
      success: false,
      error: { code: 'APP_ERROR', message: err.message },
    });
    return;
  }

  logger.error({ err, path: req.path, method: req.method }, 'Необработанная ошибка');
  res.status(500).json({
    success: false,
    error: { code: 'INTERNAL_ERROR', message: 'Внутренняя ошибка сервера' },
  });
}
