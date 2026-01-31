import { useEffect, useState } from "react";
import { getEmployees, addAttendance } from "../../services/api";

export default function AttendanceForm() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeId: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    getEmployees().then(res => setEmployees(res.data));
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Mark Attendance</h2>
      <div className="grid grid-cols-3 gap-4">
        <select className="border p-2"
          onChange={e => setForm({...form, employeeId: e.target.value})}>
          <option>Select Employee</option>
          {employees.map(e => (
            <option key={e.employee_id} value={e.employee_id}>
              {e.full_name}
            </option>
          ))}
        </select>

        <input type="date" className="border p-2"
          onChange={e => setForm({...form, date: e.target.value})} />

        <select className="border p-2"
          onChange={e => setForm({...form, status: e.target.value})}>
          <option>Present</option>
          <option>Absent</option>
        </select>
      </div>

      <button onClick={() => addAttendance(form)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Mark Attendance
      </button>
    </div>
  );
}
