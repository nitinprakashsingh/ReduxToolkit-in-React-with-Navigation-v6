import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Features/Auth/Login";
import Dashboard from "./Features/Dashboard";
import AppointmentManagement from "./Features/AppointmentManagement/AppointmentManagement";
import { getCookie } from "./utils/cookies";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return getCookie("doctor-session") === "true" ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const authenticated = getCookie("doctor-session") === "true";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute><AppointmentManagement /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to={authenticated ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
