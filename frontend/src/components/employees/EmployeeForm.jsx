import { useState } from "react";
import { addEmployee } from "../../services/api";
import toast from "react-hot-toast";

// react-icons
import { FaIdBadge, FaUser, FaEnvelope, FaBuilding, FaPlus } from "react-icons/fa";

// common components
import Input from "../common/Input";
import Button from "../common/Button";

export default function EmployeeForm({ refresh }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.employee_id || !form.full_name || !form.email || !form.department) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const toastId = toast.loading("Adding employee...");

      await addEmployee(form);

      toast.success("Employee added successfully", { id: toastId });
      refresh();

      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });
    } catch (err) {
      toast.error("Failed to add employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaPlus className="text-blue-600" />
        Add Employee
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Employee ID */}
        <div className="relative">
          <FaIdBadge className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Employee ID"
            value={form.employee_id}
            onChange={(e) =>
              setForm({ ...form, employee_id: e.target.value })
            }
            className="pl-10"
          />
        </div>

        {/* Full Name */}
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
            className="pl-10"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="pl-10"
          />
        </div>

        {/* Department */}
        <div className="relative">
          <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Department"
            value={form.department}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
            className="pl-10"
          />
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center mt-6">
        <Button
          onClick={submit}
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105"
        >
          <FaPlus />
          {loading ? "Saving..." : "Add Employee"}
        </Button>
      </div>
    </div>
  );
}
