import { Router, Request, Response } from 'express';
import { validate } from '../middleware/validate';
import { schemas } from '../../domain/validators/schemas';
import { extractMetadataUseCase } from '../../application/use-cases/metadata/extract-metadata';

const router = Router();

// POST /api/metadata — получить метаданные видео
router.post(
  '/',
  validate({ body: schemas.extractMetadata }),
  async (req: Request, res: Response) => {
    const result = await extractMetadataUseCase(req.body.url);
    res.json({ success: true, data: result });
  },
);

export default router;
