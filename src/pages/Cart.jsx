import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);

  // ✅ Check login status (from Redux or localStorage)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated) || localStorage.getItem('token');

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const formattedTotal = total.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('⚠️ Please log in to proceed with your order.');
      navigate('/login');
      return;
    }
    navigate('/order');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white p-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold mb-6 text-center"
        >
          🛒 Your Cart
        </motion.h1>

        {cartItems.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-gray-300"
          >
            Your cart is empty. Start shopping!
          </motion.p>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {cartItems.map(item => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-between bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-20 w-20 object-cover rounded-lg border border-white/30"
                  />
                  <div className="flex-1 sm:ml-6 mt-4 sm:mt-0 text-left">
                    <h2 className="text-xl font-semibold text-white">{item.name}</h2>
                    <p className="text-indigo-300 font-medium">₹{item.price}</p>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        dispatch(updateQuantity({ _id: item._id, quantity: Number(e.target.value) }))
                      }
                      className="mt-2 px-3 py-1 w-24 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="mt-4 sm:mt-0 text-red-400 hover:text-red-600 font-medium transition"
                  >
                    ❌ Remove
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-right text-lg font-semibold text-white"
            >
              Total: <span className="text-green-400">₹{formattedTotal}</span>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCheckout}
              className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transition-all duration-300"
            >
              Proceed to Order
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}