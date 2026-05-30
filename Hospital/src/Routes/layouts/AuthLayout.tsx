import { Outlet } from "react-router-dom";
import LanguageSwitcher from "../../Components/LanguageSwitcher";

const AuthLayout = () => {
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
        <LanguageSwitcher />
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;