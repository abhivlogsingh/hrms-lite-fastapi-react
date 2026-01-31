import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaCalendarCheck, FaList } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r min-h-screen p-5">
      <h1 className="text-xl font-bold mb-8">HRMS Lite</h1>

      <nav className="space-y-3">
        <NavLink to="/" className="flex items-center gap-2 p-2 rounded hover:bg-blue-100">
          <FaHome /> Dashboard
        </NavLink>
        <NavLink to="/employees" className="flex items-center gap-2 p-2 rounded hover:bg-blue-100">
          <FaUsers /> Employees
        </NavLink>
        <NavLink to="/attendance" className="flex items-center gap-2 p-2 rounded hover:bg-blue-100">
          <FaCalendarCheck /> Attendance
        </NavLink>
        <NavLink to="/view-attendance" className="flex items-center gap-2 p-2 rounded hover:bg-blue-100">
          <FaList /> View Attendance
        </NavLink>
      </nav>
    </div>
  );
}
