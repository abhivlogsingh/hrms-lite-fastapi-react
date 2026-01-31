import { Link } from "react-router-dom";

export default function ManagementCard({ title, description, icon: Icon, to }) {
  return (
    <Link
      to={to}
      className="
        bg-white rounded-2xl shadow-md p-6
        hover:shadow-xl transition
        flex items-center gap-4
        border border-gray-100
      "
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600">
        <Icon size={22} />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  );
}
