import { motion } from "framer-motion";

export default function ProductFormModal({ form, setForm, handleChange, handleSubmit, close }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl w-full max-w-md border border-white/20 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">🛍️ Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "description", "price", "quantity"].map((field) => (
            <input
              key={field}
              type={field === "price" || field === "quantity" ? "number" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/5 text-white border border-white/30 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          ))}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/5 text-white border border-white/30 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <div className="flex justify-between mt-4">
            <button type="submit" className="px-4 py-2 bg-indigo-500 rounded-lg text-white">Save</button>
            <button type="button" onClick={close} className="px-4 py-2 bg-red-500 rounded-lg text-white">Cancel</button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}