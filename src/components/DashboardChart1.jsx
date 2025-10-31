import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

export default function DashboardChart({ items = [], orders = [] }) {
  const [range, setRange] = useState("30");
  const [customRange, setCustomRange] = useState({ from: "", to: "" });

  // --- Filter orders by date range ---
  const now = new Date();
  let filteredOrders = orders;

  if (range !== "all") {
    if (range === "7" || range === "30") {
      const cutoff = new Date();
      cutoff.setDate(now.getDate() - parseInt(range));
      filteredOrders = orders.filter(
        (o) => new Date(o.createdAt) >= cutoff
      );
    } else if (range === "custom" && customRange.from && customRange.to) {
      const fromDate = new Date(customRange.from);
      const toDate = new Date(customRange.to);
      filteredOrders = orders.filter((o) => {
        const d = new Date(o.createdAt);
        return d >= fromDate && d <= toDate;
      });
    }
  }

  // --- Revenue by day ---
  const revenueByDay = {};
  filteredOrders.forEach((o) => {
    const day = new Date(o.createdAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
    revenueByDay[day] = (revenueByDay[day] || 0) + o.total;
  });

  const revenueData = {
    labels: Object.keys(revenueByDay),
    datasets: [
      {
        label: "Revenue (₹)",
        data: Object.values(revenueByDay),
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.3)",
        fill: true,
      },
    ],
  };

  // --- Orders by status ---
  const statusCounts = filteredOrders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Orders",
        data: Object.values(statusCounts),
        backgroundColor: [
          "#facc15", // Pending
          "#3b82f6", // Processing
          "#a855f7", // Shipped
          "#22c55e", // Delivered
          "#ef4444", // Cancelled
        ],
      },
    ],
  };

  // --- Payment breakdown ---
  const paymentCounts = filteredOrders.reduce((acc, o) => {
    acc[o.paymentStatus] = (acc[o.paymentStatus] || 0) + 1;
    return acc;
  }, {});

  const paymentData = {
    labels: Object.keys(paymentCounts),
    datasets: [
      {
        data: Object.values(paymentCounts),
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"], // Paid, Unpaid, Failed
      },
    ],
  };

  // --- Top Products Leaderboard ---
  const productStats = {};
  filteredOrders.forEach((o) => {
    o.items.forEach((i) => {
      if (!productStats[i.name]) {
        productStats[i.name] = { quantity: 0, revenue: 0 };
      }
      productStats[i.name].quantity += i.quantity;
      productStats[i.name].revenue += i.price * i.quantity;
    });
  });

  const topProducts = Object.entries(productStats)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5); // Top 5

  const topProductsData = {
    labels: topProducts.map((p) => p.name),
    datasets: [
      {
        label: "Revenue (₹)",
        data: topProducts.map((p) => p.revenue),
        backgroundColor: "#6366f1",
      },
      {
        label: "Quantity Sold",
        data: topProducts.map((p) => p.quantity),
        backgroundColor: "#f59e0b",
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Date Range Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="bg-slate-800 text-white px-3 py-2 rounded"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="all">All Time</option>
          <option value="custom">Custom Range</option>
        </select>

        {range === "custom" && (
          <div className="flex gap-2 items-center">
            <input
              type="date"
              value={customRange.from}
              onChange={(e) =>
                setCustomRange({ ...customRange, from: e.target.value })
              }
              className="bg-slate-800 text-white px-3 py-2 rounded"
            />
            <span className="text-gray-300">to</span>
            <input
              type="date"
              value={customRange.to}
              onChange={(e) =>
                setCustomRange({ ...customRange, to: e.target.value })
              }
              className="bg-slate-800 text-white px-3 py-2 rounded"
            />
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-2">📈 Revenue by Day</h2>
          <Line data={revenueData} />
        </div>

        {/* Orders by Status */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-2">🛒 Orders by Status</h2>
          <Bar data={statusData} />
        </div>

        {/* Payment Breakdown */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-2">💳 Payment Breakdown</h2>
          <Pie data={paymentData} />
        </div>

        {/* Top Products Leaderboard */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">🏆 Top Products</h2>
          <Bar data={topProductsData} />
          <ul className="mt-4 space-y-1 text-sm text-gray-300">
            {topProducts.map((p, idx) => (
              <li key={idx}>
                {idx + 1}. {p.name} — {p.quantity} sold, ₹{p.revenue.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}