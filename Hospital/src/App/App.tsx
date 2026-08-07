import { Routes, Route } from "react-router-dom"
import AuthLayout from "../Routes/layouts/AuthLayout"
import LoginPage from "../Features/Auth/Screens/Login/Login"
import Dashboard from "../Features/Home/screens/Dashboard"
import ForgotPasswordPage from "../Features/Auth/Screens/ForgotPassword/Forgot"

const App = () => {
  return (
    <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
export default App;
