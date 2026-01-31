import { useEffect, useState } from "react";
import { getEmployees, getAttendance } from "../services/api";

import StatCard from "../components/dashboard/StatCard";
import ManagementCard from "../components/dashboard/ManagementCard";
import Loader from "../components/common/Loader";

import {
  FaUsers,
  FaCalendarCheck,
  FaUserCog,
  FaCalendarAlt,
} from "react-icons/fa";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      const [empRes, attRes] = await Promise.all([
        getEmployees(),
        getAttendance(),
      ]);

      setEmployees(empRes.data);
      setAttendance(attRes.data);
      setError(null);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  // ⏳ Loading UI
  if (loading) {
    return <Loader text="Loading dashboard data..." />;
  }

  // ❌ Error UI
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-600">
        Failed to load dashboard data
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Management Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ManagementCard
          title="Employee Management"
          description="Add, view, and manage employees"
          icon={FaUserCog}
          to="/employees"
        />

        <ManagementCard
          title="Attendance Management"
          description="Mark and track employee attendance"
          icon={FaCalendarAlt}
          to="/attendance"
        />
      </div>

      {/* Overview */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard title="Total Employees" value={employees.length} icon={FaUsers} />
          <StatCard title="Today's Attendance" value={attendance.length} icon={FaCalendarCheck} />
        </div>
      </div>
    </div>
  );
}
