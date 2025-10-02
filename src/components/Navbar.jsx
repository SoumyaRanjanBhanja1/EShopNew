import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... backdrop-blur-md border-b border-white/20 px-6 py-4 flex items-center justify-between sticky top-0 z-50"
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
      >
        eShop
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-white font-medium">
        <Link to="/" className="hover:text-blue-400 transition duration-300">Home</Link>
        <Link to="/admin" className="hover:text-purple-400 transition duration-300">Login</Link>
        <Link to="/orders" className="hover:text-green-400 transition duration-300">Orders</Link>
        <Link to="/cart" className="hover:text-yellow-400 transition duration-300">Cart</Link>
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white focus:outline-none"
      >
        {menuOpen ? '✖' : '☰'}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-16 left-0 w-full bg-black/80 backdrop-blur-lg p-6 flex flex-col space-y-4 text-white font-medium md:hidden"
        >
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Home</Link>
          <Link to="/admin" onClick={() => setMenuOpen(false)} className="hover:text-purple-400">Admin</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Cart</Link>
        </motion.div>
      )}
    </motion.nav>
  );
}