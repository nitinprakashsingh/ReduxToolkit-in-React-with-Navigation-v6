import { Navigate, Outlet } from "react-router-dom";

const getUserRole = () => {
  return localStorage.getItem("role"); // replace with real logic
};

const RoleGuard = ({ role }: { role: string }) => {
  const userRole = getUserRole();

  if (userRole !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default RoleGuard;