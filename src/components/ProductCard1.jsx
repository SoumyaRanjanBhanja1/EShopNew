import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProductCard1({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    navigate('/login'); // or '/order' if authenticated
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 p-4"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        loading="lazy"
        onError={(e) => { e.target.src = '/default-product.jpg'; }}
        className="h-48 w-full object-cover rounded-xl mb-4"
      />
      <h2 className="text-xl font-semibold text-white">{product.name}</h2>
      <p className="text-indigo-200 text-sm line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-green-400 font-bold text-lg">₹{product.price}</span>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all duration-300"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}