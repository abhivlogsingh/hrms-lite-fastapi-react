import { useEffect, useState } from "react";
import { getEmployees, getAttendance } from "../services/api";
import StatCard from "../components/dashboard/StatCard";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    getEmployees().then(res => setEmployees(res.data));
    getAttendance().then(res => setAttendance(res.data));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6">
      <StatCard title="Total Employees" value={employees.length} />
      <StatCard title="Today's Attendance" value={attendance.length} />
    </div>
  );
}
