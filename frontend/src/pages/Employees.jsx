import { useEffect, useState } from "react";
import { getEmployees } from "../services/api";

import EmployeeForm from "../components/employees/EmployeeForm";
import EmployeeTable from "../components/employees/EmployeeTable";
import Loader from "../components/common/Loader";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const res = await getEmployees();

      console.log("EMPLOYEES API DATA:", res.data); // 👈 debug

      // ✅ ensure array
      if (Array.isArray(res.data)) {
        setEmployees(res.data);
        setError(null);
      } else {
        setEmployees([]);
        setError("Invalid response format");
      }
    } catch (err) {
      console.error("EMPLOYEES API ERROR:", err);
      setError(err.response?.data?.detail || "Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className="space-y-6">
      <EmployeeForm refresh={loadEmployees} />

      {loading ? (
        <Loader text="Loading employees..." />
      ) : (
        <EmployeeTable
          employees={employees}
          refresh={loadEmployees}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
}
