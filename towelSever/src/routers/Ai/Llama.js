import express  from 'express';
import { llamaApi } from '../../controllers/Ai.js';

const router = express.Router();

// Ai接口
router.post('/llama',llamaApi )
export default router;