import { Routes, Route } from "react-router-dom";
import PageWrapper from "./components/layout/PageWrapper";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import ViewAttendance from "./pages/ViewAttendance";

export default function App() {
  return (
    <PageWrapper>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/view-attendance" element={<ViewAttendance />} />
      </Routes>
    </PageWrapper>
  );
}
