import { useEffect, useState } from "react";
import { getEmployees, getAttendance } from "../services/api";
import AttendanceTable from "../components/attendance/AttendanceTable";

export default function ViewAttendance() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState("");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getEmployees().then(res => setEmployees(res.data));
  }, []);

  const load = () => {
    getAttendance(selected).then(res => setRecords(res.data));
  };

  return (
    <>
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">View Attendance</h2>
        <div className="flex gap-4">
          <select className="border p-2"
            onChange={e => setSelected(e.target.value)}>
            <option value="">All Employees</option>
            {employees.map(e => (
              <option key={e.employee_id} value={e.employee_id}>
                {e.full_name}
              </option>
            ))}
          </select>

          <button onClick={load}
            className="bg-blue-600 text-white px-4 py-2 rounded">
            View Attendance
          </button>
        </div>
      </div>

      <AttendanceTable records={records} />
    </>
  );
}
