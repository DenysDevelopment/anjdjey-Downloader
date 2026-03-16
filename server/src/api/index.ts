import { Router } from 'express';
import downloadRoutes from './routes/download.routes';
import metadataRoutes from './routes/metadata.routes';
import fileRoutes from './routes/file.routes';
import statsRoutes from './routes/stats.routes';

const router = Router();

router.use('/download', downloadRoutes);
router.use('/metadata', metadataRoutes);
router.use('/files', fileRoutes);
router.use('/stats', statsRoutes);

export default router;
