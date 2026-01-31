import { deleteEmployee } from "../../services/api";

export default function EmployeeTable({ employees, refresh }) {
  return (
    <div className="bg-white rounded shadow">
      <h2 className="text-lg font-semibold p-4">Employee List</h2>
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Dept</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(e => (
            <tr key={e.employee_id} className="text-center border-t">
              <td>{e.employee_id}</td>
              <td>{e.full_name}</td>
              <td>{e.email}</td>
              <td>{e.department}</td>
              <td>
                <button
                  onClick={() => { deleteEmployee(e.employee_id); refresh(); }}
                  className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
