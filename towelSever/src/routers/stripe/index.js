import express from 'express';
import { stripeApi, webhookapi } from '../../controllers/stripe.js';
const router = express.Router();

router.post("/create-payment-intent", stripeApi);

router.post('/webhook',webhookapi)
export default router;