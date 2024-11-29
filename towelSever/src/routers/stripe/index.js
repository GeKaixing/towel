import express from 'express';
import { stripeApi, webhookapi } from '../../controllers/stripe.js';
import bodyParser from 'body-parser'

const router = express.Router();

router.post("/create-payment-intent", stripeApi);

router.post('/webhook',bodyParser.raw({ type: 'application/json' }),webhookapi)
export default router;