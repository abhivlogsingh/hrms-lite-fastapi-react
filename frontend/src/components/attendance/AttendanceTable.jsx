// common reusable table
import Table from "../common/Table";

export default function AttendanceTable({ records, error, loading }) {
  const columns = [
    { key: "full_name", label: "Name" },
    { key: "date", label: "Date" },
    { key: "statusBadge", label: "Status" },
  ];

  // Status ko badge me convert kar rahe hain
  const tableData = (records || []).map((r) => ({
    ...r,
    statusBadge: (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          r.status === "Present"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {r.status}
      </span>
    ),
  }));

  // ❌ Error UI
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-600">
        Failed to load attendance records
      </div>
    );
  }

  return (
    <Table
      columns={columns}
      data={tableData}
      searchableKey="employee_name"
      loading={loading}
    />
  );
}
