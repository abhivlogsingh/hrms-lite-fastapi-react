import { FaChartBar } from "react-icons/fa";

export default function StatCard({
  title,
  value,
  icon: Icon = FaChartBar,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center justify-between">
      {/* Left side text */}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
      </div>

      {/* Right side icon */}
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600">
        <Icon size={22} />
      </div>
    </div>
  );
}
