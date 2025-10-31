import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { motion } from 'framer-motion';

export default function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Dynamically calculate total using useMemo
  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  // const formattedTotal = total.toLocaleString('en-IN');

  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paidAmount, setPaidAmount] = useState(null);

  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => createOrderAndPay();
      script.onerror = () => {
        alert('Failed to load Razorpay. Please refresh and try again.');
        setLoading(false);
      };
      document.body.appendChild(script);
    } else {
      createOrderAndPay();
    }
  }, []);

  

  const createOrderAndPay = async () => {
    if (total < 1) {
      alert('Cart total must be at least ₹1 to proceed.');
      return;
    }

    try {
      const res = await fetch('http://localhost:10000/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });

      const data = await res.json();

      if (!data.id) {
        alert('Unable to create payment order. Please try again.');
        console.error('Order creation failed:', data);
        return;
      }

      initiatePayment(data.id, data.amount);
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
    }
  };

  const initiatePayment = (orderId, amount) => {
    if (!razorpayKey) {
      console.error('Razorpay key is missing. Check your .env file.');
      return;
    }

    const options = {
      key: razorpayKey,
      amount: amount,
      currency: 'INR',
      name: 'eShop Checkout',
      description: 'Order Payment',
      order_id: orderId,
      handler: async function (response) {
        try {
          const verifyRes = await fetch('http://localhost:10000/api/payment/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: amount,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            setPaymentSuccess(true);
            setPaidAmount(amount / 100); // Convert paise to rupees
            dispatch(clearCart());
            console.log('✅ Payment verified:', verifyData.message);
          } else {
            alert('❌ Payment verification failed. Please contact support.');
            console.warn('Verification failed:', verifyData.message);
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
          alert('Something went wrong during payment verification.');
        }
      },
      prefill: {
        name: 'Soumya',
        email: 'soumya@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#6366f1',
      },
      modal: {
        ondismiss: () => {
          console.log('🛑 Razorpay modal closed by user');
          setLoading(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4"
    >
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-6">
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-indigo-600 text-center mb-4"
        >
          Checkout
        </motion.h1>

        <div className="text-center text-lg text-gray-700 mb-2">
          Total Amount: <span className="font-semibold text-green-600">${paidAmount?.toLocaleString('en-IN')}</span>
        </div>

        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-gray-500"
          >
            Redirecting to Razorpay...
          </motion.p>
        )}

        {paymentSuccess && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-green-600 font-semibold">✅ Payment Successful!</p>
            <p className="text-sm text-gray-600 mt-1">
              Thank you for your order, Soumya!<br />
              <span className="text-indigo-600 font-medium">
                Amount Paid: ${paidAmount?.toLocaleString('en-IN')}
              </span>
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Back to Home
            </button>
          </motion.div>
        )}

        <div className="mt-6 text-sm text-gray-400 text-center">
          Powered by Razorpay • Secure & Fast
        </div>
      </div>
    </motion.div>
  );
}