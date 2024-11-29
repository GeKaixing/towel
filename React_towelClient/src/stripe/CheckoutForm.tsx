import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault(); // 防止默认的表单提交刷新页面

    if (!stripe || !elements) {
      // Stripe.js 或 Elements 尚未加载
      // 禁用表单提交直到 Stripe.js 加载完成
      return;
    }

    // 使用 Payment Element 和返回 URL 确认支付
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "/", // 支付完成后的重定向地址
      },
    });

    if (result.error) {
      // 显示支付错误信息给用户
      console.log(result.error.message);
    } else {
      // 支付成功，用户将被重定向到 return_url
      console.log("Payment successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {/* 确保 Stripe 已加载时才能提交表单 */}
      <button type="submit" disabled={!stripe || !elements}>Submit Payment</button>
    </form>
  );
};

export default CheckoutForm;
