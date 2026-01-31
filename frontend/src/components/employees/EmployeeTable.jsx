import toast from "react-hot-toast";
import { deleteEmployee } from "../../services/api";

// common reusable table
import Table from "../common/Table";

export default function EmployeeTable({ employees, refresh, loading, error }) {
  const columns = [
    { key: "employee_id", label: "ID" },
    { key: "full_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "department", label: "Department" },
  ];

  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      const toastId = toast.loading("Deleting employee...");
      await deleteEmployee(row.employee_id);
      toast.success("Employee deleted successfully", { id: toastId });
      refresh();
    } catch (err) {
      toast.error("Failed to delete employee");
    }
  };

  // ❌ Error UI
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-600">
        Failed to load employees
      </div>
    );
  }

  return (
    <Table
      columns={columns}
      data={employees}
      searchableKey="full_name"
      onDelete={handleDelete}
      loading={loading}
    />
  );
}
