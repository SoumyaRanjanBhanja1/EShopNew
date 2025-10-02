import { motion } from 'framer-motion';

export default function Footer({ isAdmin = false }) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white pt-10 pb-6 px-6 mt-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            eShop
          </h3>
          <p className="text-sm text-gray-300 mt-3 leading-relaxed">
            Your gateway to premium shopping. Fast, secure, and beautifully designed for every device.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/cart" className="hover:text-white transition">Cart</a></li>
            <li><a href="/orders" className="hover:text-white transition">Orders</a></li>
            <li><a href="/checkout" className="hover:text-white transition">Checkout</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {isAdmin && <li><a href="/admin" className="hover:text-white transition">Admin Panel</a></li>}
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter + Social */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
          <form className="flex flex-col sm:flex-row items-center gap-2 mb-4">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded-lg bg-white text-black w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Subscribe
            </button>
          </form>
          <div className="flex space-x-4 text-xl text-gray-400">
            <a href="#" className="hover:text-blue-400 transition transform hover:scale-110">🌐</a>
            <a href="#" className="hover:text-pink-400 transition transform hover:scale-110">📸</a>
            <a href="#" className="hover:text-green-400 transition transform hover:scale-110">💬</a>
            <a href="#" className="hover:text-yellow-400 transition transform hover:scale-110">🎥</a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-white/20 pt-6">
        © {new Date().getFullYear()} eShop. All rights reserved.
      </div>
    </motion.footer>
  );
}