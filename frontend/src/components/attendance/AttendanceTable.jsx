export default function AttendanceTable({ records }) {
  return (
    <div className="bg-white rounded shadow">
      <h2 className="text-lg font-semibold p-4">Attendance Records</h2>
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th>Name</th><th>Date</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i} className="text-center border-t">
              <td>{r.employee_name}</td>
              <td>{r.date}</td>
              <td>
                <span className={`px-2 py-1 rounded text-white ${
                  r.status === "Present" ? "bg-green-500" : "bg-red-500"
                }`}>
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
