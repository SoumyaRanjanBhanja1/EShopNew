import { motion } from 'framer-motion';

export default function ProductCard({ product, onAdd }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 p-4"
    >
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = '/default-product.jpg'; }}
          className="h-48 w-full object-cover rounded-xl mb-4"
        />
        {typeof product.rating === 'number' && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-black/60 text-yellow-300 text-xs rounded-md">
            ★ {product.rating.toFixed(1)}
          </span>
        )}
      </div>

      <h2 className="text-lg font-semibold text-white line-clamp-1">{product.name}</h2>
      <p className="text-indigo-200 text-sm line-clamp-2">{product.description}</p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-baseline gap-2">
          <span className="text-green-400 font-bold text-lg">₹{product.price}</span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-indigo-300 text-sm line-through">₹{product.mrp}</span>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onAdd}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all duration-300"
        >
          Add to Cart
        </motion.button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-indigo-300">
        {product.brand && <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">Brand: {product.brand}</span>}
        {product.category && <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">Category: {product.category}</span>}
        {product.createdAt && (
          <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">
            Added: {new Date(product.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </motion.div>
  );
}