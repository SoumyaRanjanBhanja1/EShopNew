import { useState } from "react";
import { motion } from "framer-motion";
import { TrashIcon } from "@heroicons/react/24/solid";

// Utility: export orders to CSV
const exportToCSV = (orders) => {
  const headers = [
    "Order ID",
    "Customer",
    "Products",
    "Total",
    "Status",
    "Payment",
    "Created",
  ];
  const rows = orders.map((o) => [
    o._id,
    o.user?.name || "Guest",
    o.items.map((i) => `${i.name} × ${i.quantity}`).join(", "),
    o.total,
    o.status,
    o.paymentStatus,
    new Date(o.createdAt).toLocaleString(),
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map((r) => r.join(",")).join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = `orders_${Date.now()}.csv`;
  link.click();
};

export default function OrderTable({ items, handleUpdate, handleDelete }) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Filter + search logic
  const filtered = items.filter((o) => {
    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    const matchesPayment =
      paymentFilter === "All" || o.paymentStatus === paymentFilter;
    const matchesSearch =
      o._id.toLowerCase().includes(search.toLowerCase()) ||
      (o.user?.name || "").toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesPayment && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-4"
    >
      {/* Filters + Export */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex gap-2 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800 text-white px-3 py-2 rounded"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="bg-slate-800 text-white px-3 py-2 rounded"
          >
            <option value="All">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Failed">Failed</option>
          </select>

          <input
            type="text"
            placeholder="🔎 Search by ID or Customer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-800 text-white px-3 py-2 rounded w-60"
          />
        </div>

        <button
          onClick={() => exportToCSV(filtered)}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white shadow"
        >
          📤 Export CSV
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-300">
          <thead className="bg-indigo-800 text-white">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Products</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <motion.tr
                key={order._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="border-b border-white/20 hover:bg-white/5"
              >
                <td className="px-4 py-2">{order._id}</td>
                <td className="px-4 py-2">{order.user?.name || "Guest"}</td>
                <td className="px-4 py-2">
                  {order.items.map((i) => (
                    <div key={i.productId}>
                      {i.name} × {i.quantity}
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2 text-green-400 font-semibold">
                  ₹{order.total}
                </td>

                {/* Status dropdown */}
                <td className="px-4 py-2">
                  <motion.select
                    whileFocus={{ scale: 1.05 }}
                    value={order.status}
                    onChange={(e) =>
                      handleUpdate(order, { status: e.target.value })
                    }
                    className="bg-transparent border border-white/30 rounded px-2 py-1 text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </motion.select>
                </td>

                {/* Payment dropdown (editable now) */}
                <td className="px-4 py-2">
                  <motion.select
                    whileFocus={{ scale: 1.05 }}
                    value={order.paymentStatus}
                    onChange={(e) =>
                      handleUpdate(order, { paymentStatus: e.target.value })
                    }
                    className={`bg-transparent border border-white/30 rounded px-2 py-1 text-sm ${
                      order.paymentStatus === "Paid"
                        ? "text-green-400"
                        : order.paymentStatus === "Failed"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Failed">Failed</option>
                  </motion.select>
                </td>

                <td className="px-4 py-2">
                  {new Date(order.createdAt).toLocaleString()}
                </td>

                {/* Actions */}
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="text-red-400 hover:text-red-600"
                    title="Delete Order"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-6 text-gray-400">No orders found.</div>
      )}
    </motion.div>
  );
}