import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCalendarCheck,
  FaList,
} from "react-icons/fa";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
     ${
       isActive
         ? "bg-blue-600 text-white shadow"
         : "text-gray-700 hover:bg-blue-100"
     }`;

  return (
    <div className="w-64 bg-white border-r min-h-screen p-5 flex flex-col">
      {/* Logo / Title */}
      <h1 className="text-xl font-bold mb-10 text-gray-800">
        HRMS Lite
      </h1>

      {/* Navigation */}
      <nav className="space-y-2">
        <NavLink to="/" className={linkClass}>
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/employees" className={linkClass}>
          <FaUsers />
          <span>Employees</span>
        </NavLink>

        <NavLink to="/attendance" className={linkClass}>
          <FaCalendarCheck />
          <span>Attendance</span>
        </NavLink>

        <NavLink to="/view-attendance" className={linkClass}>
          <FaList />
          <span>View Attendance</span>
        </NavLink>
      </nav>
    </div>
  );
}
