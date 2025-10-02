import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardChart({ items }) {
  const data = {
    labels: items.map(p => p.name),
    datasets: [{
      data: items.map(p => p.quantity),
      backgroundColor: ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#f43f5e"],
    }],
  };

  return (
    <div className="max-w-xl mx-auto bg-white/10 p-6 rounded-xl shadow-xl border border-white/20">
      <h2 className="text-xl font-bold text-white mb-4 text-center">📊 Product Quantity Overview</h2>
      <Pie data={data} />
    </div>
  );
}