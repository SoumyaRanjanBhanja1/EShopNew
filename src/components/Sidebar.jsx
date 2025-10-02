import { motion } from "framer-motion";

export default function Sidebar({ setActive }) {
  return (
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-br from-indigo-800 to-purple-800 text-white shadow-xl z-50 flex flex-col justify-between"
    >
      <div className="p-6 text-2xl font-bold">🧠 Admin Panel</div>
      <nav className="flex flex-col gap-4 px-6">
        <button onClick={() => setActive("dashboard")} className="hover:text-indigo-300 text-left">📊 Dashboard</button>
        <button onClick={() => setActive("create")} className="hover:text-indigo-300 text-left">➕ Create Product</button>
        <button onClick={() => setActive("table")} className="hover:text-indigo-300 text-left">📦 Product Table</button>
      </nav>
      <div className="px-6 py-4 text-sm text-white/60">© 2025 Soumya Inc.</div>
    </motion.div>
  );
}