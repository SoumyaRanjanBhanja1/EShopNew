import { useEffect, useState } from 'react';
import { API_BASE_URL } from "../config";



export default function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('${API_BASE_URL}/api/user/orders', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('❌ Error fetching user orders:', err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🧾 Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-400">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white/10 p-4 rounded-lg shadow border border-white/20">
              <p><strong>Order Date:</strong> {new Date(order.createdAt).toDateString()}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ₹{order.total.toLocaleString('en-IN')}</p>
              <p><strong>Items:</strong></p>
              <ul className="list-disc ml-6 text-sm text-indigo-200">
                {order.items.map((item, idx) => (
                  <li key={idx}>{item.name} × {item.quantity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



