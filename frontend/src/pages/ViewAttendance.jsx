import { useEffect, useState } from "react";
import { getEmployees, getAttendance } from "../services/api";

import AttendanceTable from "../components/attendance/AttendanceTable";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";

import { FaUserTie, FaFilter } from "react-icons/fa";

export default function ViewAttendance() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState("");
  const [records, setRecords] = useState([]);

  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
  const loadEmployees = async () => {
    try {
      setLoadingEmployees(true);

      const res = await getEmployees();
      setEmployees(res.data);
      setError(null);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || "Failed to load employees"
      );
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
    setError(null);
  } catch (err) {
    console.error(err);

    setError(
      err.response?.data?.message || "Failed to load attendance records"
    );
  } finally {
    setLoadingRecords(false);
  }
};


  return (
    <div className="max-w-7xl mx-auto px-4 space-y-8">
      {/* Filter Card */}
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaFilter className="text-blue-600" />
          View Attendance
        </h2>

        {loadingEmployees ? (
          <Loader text="Loading employees..." />
        ) : (
          <div className="flex flex-col md:flex-row gap-4 items-end">
            {/* Employee Select */}
            <div className="w-full">
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Select Employee
              </label>
              <div className="relative">
                <FaUserTie className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                >
                  <option value="">All Employees</option>
                  {employees.map((e) => (
                    <option key={e.employee_id} value={e.employee_id}>
                      {e.full_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Button */}
            <Button
              onClick={loadAttendance}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md transition"
            >
              <FaFilter />
              View
            </Button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
            ❌ Failed to load attendance data. Please try again.
          </div>
        )}
      </div>

      {/* Table */}
      {loadingRecords ? (
        <Loader text="Loading attendance records..." />
      ) : records.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
          📭 No attendance records found
        </div>
      ) : (
        <AttendanceTable records={records} error={error} />
      )}
    </div>
  );
}
