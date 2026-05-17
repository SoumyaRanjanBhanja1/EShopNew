import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import {API_BASE_URL} from "../config"


export default function Order() {
  const cartItems = useSelector(state => state.cart.items);
  const navigate = useNavigate();

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const formattedTotal = total.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });


  

  const handlePlaceOrder = async () => {
    try {
      const res = await fetch('${API_BASE_URL}/api/order/place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          items: cartItems.map(item => ({
            productId: item._id,
            name: item.name,
            imageUrl: item.imageUrl,
            price: item.price,
            quantity: item.quantity,
          })),
          total,
        }),
      });

      if (res.status === 401) {
        alert('⚠️ Please log in to place your order.');
        navigate('/login');
        return;
      }

      const data = await res.json();

      if (data.success) {
        console.log('✅ Order placed:', data.orderId);
        navigate('/checkout');
      } else {
        alert('❌ Failed to place order: ' + data.error);
      }
    } catch (error) {
      console.error('Order placement error:', error);
      alert('Something went wrong while placing the order.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white p-6"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold mb-6 text-center"
        >
          📦 Order Summary
        </motion.h1>

        {cartItems.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-gray-300"
          >
            Your cart is empty. Add items to place an order.
          </motion.p>
        ) : (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-4 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20"
          >
            {cartItems.map(item => (
              <li
                key={item._id}
                className="flex items-center justify-between gap-4 text-white"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded-lg border border-white/30"
                />
                <div className="flex-1">
                  <p className="font-medium">
                    {item.name} × {item.quantity}
                  </p>
                  <p className="text-indigo-300 text-sm">
                    ${item.price.toLocaleString('en-IN')} each
                  </p>
                </div>
                <div className="text-green-400 font-semibold">
                  ${(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </li>
            ))}
          </motion.ul>
        )}

        {cartItems.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 text-right text-xl font-bold text-white"
            >
              Total: <span className="text-green-400">${formattedTotal}</span>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlaceOrder}
              className="mt-6 w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg transition-all duration-300"
            >
               Proceed to Checkout
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}

