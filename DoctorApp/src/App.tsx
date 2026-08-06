import { type ReactElement } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login, ResetPassword } from "./Features/Auth";
import { Dashboard, AppointmentManagement } from "./Features/Home";
import { getCookie } from "./utils/cookies";

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  return getCookie("doctor-session") === "true" ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const authenticated = getCookie("doctor-session") === "true";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute><AppointmentManagement /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to={authenticated ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
