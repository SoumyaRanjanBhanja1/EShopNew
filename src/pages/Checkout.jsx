import { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  ShieldCheckIcon, 
  CheckCircleIcon, 
  LockClosedIcon,
  ArrowRightIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

// Register GSAP Plugin
gsap.registerPlugin(useGSAP);

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);

  const containerRef = useRef(null);
  const cardRef = useRef(null);

  // Dynamically calculate total using useMemo
  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paidAmount, setPaidAmount] = useState(null);

  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

  // Initial Entry Animation
  useGSAP(() => {
    gsap.from(cardRef.current, {
      y: 60,
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: 'expo.out',
    });
  }, { scope: containerRef });

  // FIXED: Using fromTo guarantees the elements will become visible
  useGSAP(() => {
    if (paymentSuccess) {
      gsap.fromTo('.success-anim', 
        { y: 30, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: 'back.out(1.5)' 
        }
      );
      
      gsap.to('.success-ring', {
        scale: 1.5,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: 'power2.out',
      });
    }
  }, [paymentSuccess]);

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
      navigate('/cart');
      return;
    }

    setLoading(true);

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
        setLoading(false);
        return;
      }

      initiatePayment(data.id, data.amount);
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      setLoading(false);
    }
  };

  const initiatePayment = (orderId, amount) => {
    if (!razorpayKey) {
      console.error('Razorpay key is missing. Check your .env file.');
      setLoading(false);
      return;
    }

    const options = {
      key: razorpayKey,
      amount: amount,
      currency: 'INR',
      name: 'SmartShop Premium',
      description: 'Secure Order Payment',
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
            setPaidAmount(amount / 100); 
            dispatch(clearCart());
            setLoading(false);
          } else {
            alert('❌ Payment verification failed. Please contact support.');
            setLoading(false);
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
          alert('Something went wrong during payment verification.');
          setLoading(false);
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
          setLoading(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div 
      ref={containerRef}
      /* FIXED: Added padding (py-10), overflow-x-hidden, and overflow-y-auto to prevent button from getting cut off on mobile */
      className="min-h-screen flex items-center justify-center bg-[#030303] text-white px-4 py-10 relative overflow-x-hidden overflow-y-auto font-sans"
    >
      {/* Premium Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div 
        ref={cardRef}
        /* FIXED: Added my-auto so it scrolls gracefully if it exceeds screen height */
        className="max-w-md w-full my-auto bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-6 sm:p-8 relative z-10"
      >
        {/* Header Section */}
        {!paymentSuccess && (
          <div className="flex flex-col items-center justify-center mb-8 border-b border-white/10 pb-8">
            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4 border border-indigo-500/20">
              <ShieldCheckIcon className="w-8 h-8 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-light tracking-wide text-white mb-2">Secure Checkout</h1>
            <p className="text-sm text-gray-400 flex items-center gap-1.5 font-light">
              <LockClosedIcon className="w-4 h-4" /> End-to-end encrypted
            </p>
          </div>
        )}

        {/* Loading / Waiting State */}
        {!paymentSuccess && loading && (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-12 h-12 mb-4">
              <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-r-2 border-purple-500 animate-[spin_1.5s_linear_infinite_reverse]"></div>
            </div>
            <p className="text-indigo-300 font-medium tracking-wide">Connecting to Razorpay...</p>
            <p className="text-xs text-gray-500 mt-2 font-light">Please do not close this window</p>
          </div>
        )}

        {/* Amount Display & Retry/Home State (Visible if user cancels or payment fails) */}
        {!paymentSuccess && !loading && (
          <div className="text-center py-6">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Total Payable</p>
            <div className="text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              ₹{total?.toLocaleString('en-IN')}
            </div>
            
            <button 
              onClick={createOrderAndPay}
              className="mt-8 w-full group relative overflow-hidden rounded-xl bg-white text-black font-semibold tracking-widest py-4 hover:scale-[1.02] transition-transform duration-300 active:scale-95"
            >
              <span className="relative z-10 uppercase">Retry Payment</span>
            </button>

            <button
              onClick={() => navigate('/')}
              className="mt-4 w-full group flex items-center justify-center gap-2 py-4 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white hover:border-white/30 transition-all duration-300 tracking-widest uppercase text-xs font-semibold"
            >
              <HomeIcon className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              Return To Home
            </button>
          </div>
        )}

        {/* Success State */}
        {paymentSuccess && (
          <div className="flex flex-col items-center text-center py-4">
            <div className="relative success-anim mb-6">
              <div className="success-ring absolute inset-0 bg-emerald-500 rounded-full blur-md opacity-50"></div>
              <CheckCircleIcon className="relative z-10 w-20 h-20 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
            </div>
            
            <h2 className="success-anim text-3xl font-light text-white mb-2 tracking-tight">Payment Successful</h2>
            <p className="success-anim text-gray-400 font-light mb-8">
              Thank you for your order! Your transaction has been securely processed.
            </p>

            <div className="success-anim w-full bg-black/40 border border-white/5 rounded-2xl p-6 mb-8 text-left">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                <span className="text-sm text-gray-500 uppercase tracking-widest">Amount Paid</span>
                <span className="text-xl font-medium text-emerald-400">₹{paidAmount?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Transaction ID</span>
                <span className="text-sm text-gray-300 font-mono">#RZP-{Math.floor(Math.random() * 1000000)}</span>
              </div>
            </div>

            {/* Guaranteed visible button */}
            <button
              onClick={() => navigate('/')}
              className="success-anim group flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white text-black hover:bg-gray-200 transition-all duration-300 tracking-widest uppercase text-sm font-bold hover:scale-[1.02] active:scale-95"
            >
              <HomeIcon className="w-5 h-5" />
              Back To Home
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-1" />
            </button>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center flex items-center justify-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
          <ShieldCheckIcon className="w-4 h-4 text-gray-400" />
          <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-light">
            Powered by Razorpay
          </span>
        </div>
      </div>
    </div>
  );
}