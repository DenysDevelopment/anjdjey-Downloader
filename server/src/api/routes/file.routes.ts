import { Router, Request, Response } from 'express';
import { validate } from '../middleware/validate';
import { schemas } from '../../domain/validators/schemas';
import { getDownloadFile } from '../../application/use-cases/download/get-download-file';

const router = Router();

// GET /api/files/:fileId — скачать файл
router.get(
  '/:fileId',
  validate({ params: schemas.fileIdParams }),
  async (req: Request, res: Response) => {
    const file = await getDownloadFile(req.params.fileId);

    res.setHeader('Content-Type', file.mimeType);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(file.fileName)}"`,
    );
    if (file.fileSize) {
      res.setHeader('Content-Length', file.fileSize);
    }

    (file.stream as NodeJS.ReadableStream).pipe(res);
  },
);

export default router;
