import { useEffect, useState } from "react";
import { getAttendance } from "../services/api";
import AttendanceForm from "../components/attendance/AttendanceForm";
import AttendanceTable from "../components/attendance/AttendanceTable";

export default function Attendance() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getAttendance().then(res => setRecords(res.data));
  }, []);

  return (
    <>
      <AttendanceForm />
      <AttendanceTable records={records} />
    </>
  );
}
