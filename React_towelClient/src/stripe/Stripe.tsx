//@ts-nocheck
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
//确保在组件的渲染之外调用loadStripe来避免 
//在每次渲染中重新创建‘ Stripe ’对象。
const stripePromise = loadStripe('pk_test_51PnB6xRs7Bcn7mLsjd3slxgTeP3rLrNPRgIfH1N3iAUBWiWOF8o1pBZyiFc39VabEeRoq6R3lYmVG7HKdgh0XLKI00FGqP6fPe');

export default function Stripe() {
  const options = {
    // passing the client secret obtained from the server
    //传递从服务器获得的客户端秘密
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};