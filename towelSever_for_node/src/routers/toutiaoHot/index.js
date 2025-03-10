import express from 'express';

import { toutiaohotApi } from '../../controllers/toutiaoHot.js';

const router = express.Router();

//爬虫爬取今日头条
router.get('/toutiaohot', toutiaohotApi)

export default  router;