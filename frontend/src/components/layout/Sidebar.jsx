import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCalendarCheck,
  FaList,
} from "react-icons/fa";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
     ${
       isActive
         ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
         : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
     }`;

  return (
    <div className="w-64 bg-white border-r min-h-screen p-6 flex flex-col">
      {/* Logo / Brand */}
      <div className="mb-10">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          HRMS Lite
        </h1>
        <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <NavLink to="/" className={linkClass}>
          <FaHome className="text-lg group-hover:scale-110 transition" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/employees" className={linkClass}>
          <FaUsers className="text-lg group-hover:scale-110 transition" />
          <span>Employees</span>
        </NavLink>

        <NavLink to="/attendance" className={linkClass}>
          <FaCalendarCheck className="text-lg group-hover:scale-110 transition" />
          <span>Attendance</span>
        </NavLink>

        <NavLink to="/view-attendance" className={linkClass}>
          <FaList className="text-lg group-hover:scale-110 transition" />
          <span>View Attendance</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t text-xs text-gray-400">
        © {new Date().getFullYear()} HRMS Lite
      </div>
    </div>
  );
}
