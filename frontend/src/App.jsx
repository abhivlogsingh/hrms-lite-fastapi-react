import { Routes, Route } from "react-router-dom";
import PageWrapper from "./components/layout/PageWrapper";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import ViewAttendance from "./pages/ViewAttendance";

// ✅ toaster import
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      {/* ✅ Toaster mount */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "14px",
          },
        }}
      />

      <PageWrapper>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/view-attendance" element={<ViewAttendance />} />
        </Routes>
      </PageWrapper>
    </>
  );
}
