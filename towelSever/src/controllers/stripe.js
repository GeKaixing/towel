import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51PnB6xRs7Bcn7mLsRqQtpznNz0tDZZ5LgKpx6IDiDJXs3neM7Zbh0BqlZdNWhVvwmWa1eZibFADCWGjy9rdaDPuN00Twpw8jWs');
const endpointSecret = 'whsec_52dee8753289eac11cc7608fe02a779dbcce7abd0a4f319b55d308af53860464'

export const stripeApi=async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,   // 支付金额
      currency: "usd",// 支付币种
      automatic_payment_methods: { enabled: true },// 启用自动支付方法
    });

    res.send({
      clientSecret: paymentIntent.client_secret,  // 返回clientSecret
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// 处理 Webhook 请求
export const webhookapi= async (req, res) => {
  const sig = req.headers['stripe-signature'];  // 获取请求中的签名
  let event;

  try {
    // 使用 Stripe 的验证方法验证请求签名
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log('Webhook signature verification failed.');
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 处理不同类型的事件
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object; // 获取支付意图对象
      const customerId = paymentIntent.customer; // 获取客户 ID
      console.log(paymentIntent,customerId)
      console.log('PaymentIntent was successful!');
      // 这里可以进行支付成功后的处理逻辑
      break;
    case 'payment_intent.payment_failed':
      const paymentFailedIntent = event.data.object;
      console.log('PaymentIntent failed!');
      // 这里可以进行支付失败后的处理逻辑
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // 返回 200 状态码，告知 Stripe 已处理完毕
  res.json({ received: true });
}
