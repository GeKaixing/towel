import express from 'express'
import { HPImageArchiveApi } from '../../controllers/bing.js';

const router = express.Router();
// 爬取Bing的壁纸
router.get('/HPImageArchive',HPImageArchiveApi);

export default router;