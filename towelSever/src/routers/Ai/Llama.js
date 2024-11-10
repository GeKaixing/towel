import express  from 'express';
import { llanaApi } from '../../controllers/Ai.js';

const router = express.Router();

// Ai接口
router.post('/llama',llanaApi )
export default router;