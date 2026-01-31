import { FaUserCircle, FaBars } from "react-icons/fa";

export default function Navbar({ onMenuClick }) {
  return (
    <div className="w-full bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-3 text-gray-800 font-semibold text-lg">
        <button
          onClick={onMenuClick}
          className="md:hidden text-blue-600"
        >
          <FaBars />
        </button>
        <span>HRMS Lite – Admin Panel</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 text-gray-600">
        <FaUserCircle size={22} />
        <span className="hidden sm:block text-sm font-medium">Admin</span>
      </div>
    </div>
  );
}
