import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function FloatingCart() {
  const cartItems = useSelector(state => state.cart.items);
  const navigate = useNavigate();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 left-6 z-50"
    >
      <button
        onClick={() => navigate('/cart')}
        className="relative bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition"
      >
        🛒
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {itemCount}
          </span>
        )}
      </button>
    </motion.div>
  );
}