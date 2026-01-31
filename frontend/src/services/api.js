import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/* ================= EMPLOYEES ================= */

export const getEmployees = () => API.get("/employees/");

export const addEmployee = (data) => API.post("/employees/", data);

export const deleteEmployee = (id) =>
  API.delete(`/employees/${id}`);

/* ================= ATTENDANCE ================= */

export const getAttendance = (employeeId) =>
  employeeId
    ? API.get(`/attendance/${employeeId}`)
    : API.get("/attendance/");

export const addAttendance = (data) =>
  API.post("/attendance/", data);
