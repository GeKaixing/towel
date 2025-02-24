import express  from 'express';
import { llamaApi ,deepseekApi} from '../../controllers/Ai.js';

const router = express.Router();

// Ai接口
router.post('/llama',llamaApi )
router.post('/deepseek',deepseekApi )
export default router;