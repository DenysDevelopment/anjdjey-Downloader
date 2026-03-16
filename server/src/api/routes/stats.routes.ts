import { Router, Request, Response } from 'express';
import { downloadRepository } from '../../infrastructure/repositories/download.repository';

const router = Router();

// GET /api/stats — публичная статистика
router.get('/', async (_req: Request, res: Response) => {
  const [today, total] = await Promise.all([
    downloadRepository.getTodayStats(),
    downloadRepository.getTotalStats(),
  ]);

  res.json({
    success: true,
    data: {
      totalDownloads: total.total,
      completedDownloads: total.completed,
      todayDownloads: today.totalToday,
      todayCompleted: today.completedToday,
    },
  });
});

export default router;
