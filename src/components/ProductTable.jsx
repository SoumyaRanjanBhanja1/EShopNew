export default function ProductTable({ items, handleEdit, handleDelete }) {
  return (
    <div className="overflow-x-auto bg-white/10 rounded-xl shadow-xl p-6 border border-white/20">
      <table className="min-w-full text-white">
        <thead>
          <tr className="bg-indigo-700">
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p._id} className="border-t border-white/20 hover:bg-white/5 transition">
              <td className="px-4 py-2">
                <img src={p.imageUrl} alt={p.name} className="h-10 w-10 rounded object-cover" />
              </td>
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">₹{p.price}</td>
              <td className="px-4 py-2">{p.quantity}</td>
              <td className="px-4 py-2 flex gap-2">
                <button onClick={() => handleEdit(p)} className="px-2 py-1 bg-blue-500 rounded text-sm">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="px-2 py-1 bg-red-500 rounded text-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}