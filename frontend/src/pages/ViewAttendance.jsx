import { useEffect, useState } from "react";
import { getEmployees, getAttendance } from "../services/api";

import AttendanceTable from "../components/attendance/AttendanceTable";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

import { FaUserTie, FaFilter } from "react-icons/fa";

export default function ViewAttendance() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState("");
  const [records, setRecords] = useState([]);

  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [error, setError] = useState(false);

  // Load employees for dropdown
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        setLoadingEmployees(true);
        const res = await getEmployees();
        setEmployees(res.data);
        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoadingEmployees(false);
      }
    };

    loadEmployees();
  }, []);

  const loadAttendance = async () => {
    try {
      setLoadingRecords(true);
      const res = await getAttendance(selected);
      setRecords(res.data);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoadingRecords(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Card */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaFilter className="text-blue-600" />
          View Attendance
        </h2>

        {loadingEmployees ? (
          <Loader text="Loading employees..." />
        ) : (
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Employee Select */}
            <div className="relative w-full">
              <FaUserTie className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">All Employees</option>
                {employees.map((e) => (
                  <option key={e.employee_id} value={e.employee_id}>
                    {e.full_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Button */}
            <Button
              onClick={loadAttendance}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              <FaFilter />
              View Attendance
            </Button>
          </div>
        )}

        {/* Error UI */}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
            Failed to load attendance data
          </div>
        )}
      </div>

      {/* Table */}
      {loadingRecords ? (
        <Loader text="Loading attendance records..." />
      ) : (
        <AttendanceTable records={records} error={error} />
      )}
    </div>
  );
}
