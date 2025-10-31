export default function ChartBlock({ title, children }) {
  return (
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold mb-2 text-white">{title}</h2>
      {children}
    </div>
  );
}