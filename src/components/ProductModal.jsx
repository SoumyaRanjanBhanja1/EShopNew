import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

export default function ProductModal({ product, onClose }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="bg-white text-black rounded-xl shadow-2xl max-w-2xl w-full p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
        >
          ✖
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg hover:scale-105 transition"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-green-600 font-bold text-xl mb-4">₹{product.price}</p>

            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Add to Cart
            </button>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">⭐ Reviews</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>“Amazing quality!” – Priya</li>
                <li>“Fast delivery and great packaging.” – Rahul</li>
                <li>“Totally worth the price.” – Ananya</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}