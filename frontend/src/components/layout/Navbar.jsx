import { FaUserCircle, FaBars } from "react-icons/fa";

export default function Navbar({ onMenuClick }) {
  return (
    <header className="w-full bg-white/80 backdrop-blur border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
        >
          <FaBars />
        </button>

        <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          HRMS Lite – Admin Panel
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
          <FaUserCircle size={20} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
