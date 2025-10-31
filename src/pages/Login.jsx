import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://eshopnew-server-4.onrender.com",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await API.post(
      "/api/auth/login",
      {
        email: form.email.trim().toLowerCase(), // 👈 lowercase fix
        password: form.password.trim(),
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate(res.data.user.role === "admin" ? "/admin" : "/order");
  } catch (err) {
    console.log("Login error:", err.response?.data);
    setError(err.response?.data?.message || "Login failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
      >
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          🔐 Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm text-white mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-white mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg shadow-lg transition duration-300 ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-sm text-center text-white/70 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-300 hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
