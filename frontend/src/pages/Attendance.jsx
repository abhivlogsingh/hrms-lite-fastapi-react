import { useEffect, useState } from "react";
import { getAttendance } from "../services/api";

import AttendanceForm from "../components/attendance/AttendanceForm";
import AttendanceTable from "../components/attendance/AttendanceTable";
import Loader from "../components/common/Loader";

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await getAttendance();
      setRecords(res.data);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="space-y-6">
      {/* Form */}
      <AttendanceForm refresh={fetchAttendance} />

      {/* Table */}
      {loading ? (
        <Loader text="Loading attendance records..." />
      ) : (
        <AttendanceTable
          records={records}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
}
