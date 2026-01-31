import { useState } from "react";
import { addEmployee } from "../../services/api";

export default function EmployeeForm({ refresh }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const submit = async () => {
    await addEmployee(form);
    refresh();
    setForm({ employee_id: "", full_name: "", email: "", department: "" });
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Add Employee</h2>
      <div className="grid grid-cols-4 gap-4">
        <input className="border p-2" placeholder="Employee ID"
          value={form.employee_id}
          onChange={e => setForm({...form, employee_id: e.target.value})} />
        <input className="border p-2" placeholder="Full Name"
          value={form.full_name}
          onChange={e => setForm({...form, full_name: e.target.value})} />
        <input className="border p-2" placeholder="Email"
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})} />
        <input className="border p-2" placeholder="Department"
          value={form.department}
          onChange={e => setForm({...form, department: e.target.value})} />
      </div>
      <button onClick={submit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Add Employee
      </button>
    </div>
  );
}
