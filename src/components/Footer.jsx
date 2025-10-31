import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  LinkIcon,
  ArrowUpRightIcon,
  ChatBubbleBottomCenterTextIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/solid';

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
          <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            SmartShop
          </h3>
          <p className="text-sm text-gray-300 mt-3 leading-relaxed">
            Your gateway to premium shopping. Fast, secure, and beautifully designed for every device. Trusted by thousands globally.
          </p>
          <p className="text-xs text-gray-400 mt-2">Built with ❤️ by developers for developers.</p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/" className="hover:text-white transition"><span className='text-sky-200 font-mono'>Smart</span><span className='text-pink-200 font-light'>Shop</span></a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {isAdmin && <li><a href="/admin" className="hover:text-white transition">Admin Panel</a></li>}
            <li><a href="/About" className="hover:text-white transition">About Us</a></li>
            <li><a href="/careers" className="hover:text-white transition">Careers</a></li>
            <li><a href="/Investors" className="hover:text-white transition">Investors</a></li>
            <li><a href="/help" className="hover:text-white transition">Help Center</a></li>
            <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Connect */}
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
          <div className="flex space-x-4 text-gray-400">
            <a
              href="mailto:soumyabhanja113@gmail.com"
              className="hover:text-red-400 transition transform hover:scale-110"
              title="Email Us"
            >
              <EnvelopeIcon className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/soumya-ranjan-bhanja-270644247"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition transform hover:scale-110"
              title="LinkedIn"
            >
              <LinkIcon className="w-6 h-6" />
            </a>
            {/* <a
              href="https://twitter.com/eshop"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition transform hover:scale-110"
              title="Twitter"
            >
              <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
            </a> */}
            <a
              href="https://youtube.com/@odiagirl134?si=_KxOF_Oi_zsTuJrn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition transform hover:scale-110"
              title="YouTube"
            >
              <PlayCircleIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-white/20 pt-6">
        © {new Date().getFullYear()} SmartShop. All rights reserved. | Crafted for performance, designed for delight.
      </div>
    </motion.footer>
  );
}