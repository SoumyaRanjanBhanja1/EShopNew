// import { motion } from "framer-motion";

// export default function Sidebar({ setActive }) {
//   return (
//     <motion.div
//       initial={{ x: -200 }}
//       animate={{ x: 0 }}
//       transition={{ duration: 0.5 }}
//       className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-br from-indigo-800 to-purple-800 text-white shadow-xl z-50 flex flex-col justify-between"
//     >
//       <div className="p-6 text-2xl font-bold">🧠 Admin Panel</div>
//       <nav className="flex flex-col gap-4 px-6">
//         <button onClick={() => setActive("dashboard")} className="hover:text-indigo-300 text-left">📊 Dashboard</button>
//         <button onClick={() => setActive("create")} className="hover:text-indigo-300 text-left">➕ Create Product</button>
//         <button onClick={() => setActive("table")} className="hover:text-indigo-300 text-left">📦 Product Table</button>
//       </nav>
//       <div className="px-6 py-4 text-sm text-white/60">© 2025 Soumya Inc.</div>
//     </motion.div>
//   );
// }




import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";

export default function Sidebar({ setActive }) {
  const [active, setActiveLocal] = useState("dashboard");

  const handleClick = (tab) => {
    setActive(tab);
    setActiveLocal(tab);
  };

  const linkClass = (tab) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
      active === tab
        ? "bg-indigo-600 text-white shadow-md"
        : "text-gray-300 hover:bg-indigo-700 hover:text-white"
    }`;

  return (
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-br from-indigo-800 to-purple-800 text-white shadow-xl z-50 flex flex-col justify-between"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-6 text-2xl font-bold flex items-center gap-2"
      >
        🧠 Admin Panel
      </motion.div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 px-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => handleClick("dashboard")}
          className={linkClass("dashboard")}
        >
          <ChartBarIcon className="w-5 h-5" /> Dashboard
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => handleClick("create")}
          className={linkClass("create")}
        >
          <PlusCircleIcon className="w-5 h-5" /> Add Product
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => handleClick("table")}
          className={linkClass("table")}
        >
          <TableCellsIcon className="w-5 h-5" /> Product Table
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => handleClick("orders")}
          className={linkClass("orders")}
        >
          <ClipboardDocumentListIcon className="w-5 h-5" /> Orders
        </motion.div>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 text-sm text-white/60 border-t border-white/20">
        © {new Date().getFullYear()} Soumya Inc.
      </div>
    </motion.div>
  );
}