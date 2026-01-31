import { useEffect, useState } from "react";
import { getEmployees } from "../services/api";
import EmployeeForm from "../components/employees/EmployeeForm";
import EmployeeTable from "../components/employees/EmployeeTable";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  const load = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    load(); // 👈 function call inside useEffect
  }, []);

  return (
    <>
      <EmployeeForm refresh={load} />
      <EmployeeTable employees={employees} refresh={load} />
    </>
  );
}
