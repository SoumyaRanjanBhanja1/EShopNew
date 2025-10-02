export default function OrderTable({ orders }) {
  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div key={order._id} className="bg-white/10 p-4 rounded-lg shadow border border-white/20">
          <p><strong>User:</strong> {order.userId?.name} ({order.userId?.email})</p>
          <p><strong>Total:</strong> ₹{order.total.toLocaleString('en-IN')}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Items:</strong></p>
          <ul className="list-disc ml-6 text-sm text-indigo-200">
            {order.items.map((item, idx) => (
              <li key={idx}>{item.name} × {item.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}