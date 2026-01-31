import { useEffect, useState } from "react";
import { getEmployees } from "../services/api";

import EmployeeForm from "../components/employees/EmployeeForm";
import EmployeeTable from "../components/employees/EmployeeTable";
import Loader from "../components/common/Loader";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const res = await getEmployees();
      setEmployees(res.data);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className="space-y-6">
      {/* Form */}
      <EmployeeForm refresh={loadEmployees} />

      {/* Table */}
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
