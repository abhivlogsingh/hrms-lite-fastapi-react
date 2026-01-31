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
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      borderRadius: "12px",
      background: "#ffffff",
      color: "#333",
      fontSize: "14px",
      padding: "12px 16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      border: "1px solid #eee",
    },
    success: {
      style: {
        border: "1px solid #22c55e",
      },
    },
    error: {
      style: {
        border: "1px solid #ef4444",
      },
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
