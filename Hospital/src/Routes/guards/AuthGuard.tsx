import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  return !!localStorage.getItem("admin_token");
};

const AuthGuard = ({ children }: any) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;
