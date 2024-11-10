import express from 'express'
import { HPImageArchiveApi } from '../../controllers/bing';
const router = express.Router();
router.get('/HPImageArchive',HPImageArchiveApi);
export default router;