import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";

const InvestorsPage = () => {
  const chartData = {
    labels: ["2022", "2023", "2024", "2025", "2026"],
    datasets: [
      {
        label: "Global E-commerce ($T)",
        data: [5.2, 6.1, 6.9, 7.5, 8.1],
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.2)",
      },
    ],
  };

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-4"
        >
          Redefining the Future of Shopping
        </motion.h1>
        <p className="text-lg mb-6">A scalable, AI-powered e-commerce platform built for global growth.</p>
        <div className="space-x-4">
          <a href="/investor-deck.pdf" className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold">
            Download Investor Deck
          </a>
          <a href="/intro-video.mp4" className="px-6 py-3 border border-white rounded-lg font-semibold">
            Watch Intro Video
          </a>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-6">Market Opportunity</h2>
        <Line data={chartData} />
      </section>

      {/* Milestones */}
      <section className="bg-white py-16 px-6 shadow-sm">
        <h2 className="text-3xl font-bold mb-6">Milestones</h2>
        <ul className="space-y-4">
          <motion.li initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>2024 – Beta Launch</motion.li>
          <motion.li initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>2025 – 10k Users</motion.li>
          <motion.li initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>2026 – Series A Funding</motion.li>
        </ul>
      </section>

      {/* Contact */}
      <section className="text-center py-16 bg-gray-100">
        <h2 className="text-3xl font-bold mb-4">Investor Relations</h2>
        <p className="mb-4">Reach us at <a href="mailto:investors@yourapp.com" className="text-indigo-600">investors@yourapp.com</a></p>
      </section>
    </div>
  );
};

export default InvestorsPage;