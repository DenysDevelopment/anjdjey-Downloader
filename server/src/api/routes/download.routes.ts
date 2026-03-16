import { Router, Request, Response } from 'express';
import { validate } from '../middleware/validate';
import { schemas } from '../../domain/validators/schemas';
import { submitDownload } from '../../application/use-cases/download/submit-download';
import { getDownloadStatus } from '../../application/use-cases/download/get-download-status';

const router = Router();

// POST /api/download — отправить запрос на скачивание
router.post(
  '/',
  validate({ body: schemas.submitDownload }),
  async (req: Request, res: Response) => {
    const result = await submitDownload({
      url: req.body.url,
      quality: req.body.quality,
      source: req.body.source,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    });

    res.json({ success: true, data: result });
  },
);

// GET /api/download/:jobId — получить статус скачивания
router.get(
  '/:jobId',
  validate({ params: schemas.jobIdParams }),
  async (req: Request, res: Response) => {
    const result = await getDownloadStatus(req.params.jobId);
    res.json({ success: true, data: result });
  },
);

export default router;
