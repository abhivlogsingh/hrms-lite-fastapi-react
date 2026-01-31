import { useEffect, useState } from "react";
import { getEmployees, addAttendance } from "../../services/api";
import toast from "react-hot-toast";

// react-icons
import { FaUserTie, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

// common components
import Button from "../common/Button";
import Input from "../common/Input";
import Loader from "../common/Loader";

export default function AttendanceForm({ refresh }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    employeeId: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    getEmployees()
      .then((res) => setEmployees(res.data))
      .catch(() => toast.error("Failed to load employees"));
  }, []);

const handleSubmit = async () => {
  if (!form.employeeId || !form.date) {
    toast.error("Please fill all fields");
    return;
  }

  const toastId = toast.loading("Marking attendance...");

  try {
    setLoading(true);

    await addAttendance({
      employee_id: form.employeeId,
      date: form.date,
      status: form.status,
    });

    toast.success("Attendance marked successfully", { id: toastId });
    
    await refresh();

    setForm({
      employeeId: "",
      date: "",
      status: "Present",
    });
  } catch (err) {
    console.error(err);

    toast.error(
      err.response?.data?.detail || "Failed to mark attendance",
      { id: toastId }
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
        <FaCheckCircle className="text-blue-600" />
        Mark Attendance
      </h2>

      {/* Loader while employees loading */}
      {employees.length === 0 ? (
        <Loader text="Loading employees..." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Employee */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Employee
            </label>
            <div className="relative">
              <FaUserTie className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={form.employeeId}
                onChange={(e) =>
                  setForm({ ...form, employeeId: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Employee</option>
                {employees.map((e) => (
                  <option key={e.employee_id} value={e.employee_id}>
                    {e.full_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Date
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
                className="pl-10"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
        </div>
      )}

      {/* Button */}
      <div className="flex justify-center mt-6">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105"
        >
          <FaCheckCircle />
          {loading ? "Saving..." : "Mark Attendance"}
        </Button>
      </div>
    </div>
  );
}
