import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <h2>Dashboard Sidebar</h2>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;