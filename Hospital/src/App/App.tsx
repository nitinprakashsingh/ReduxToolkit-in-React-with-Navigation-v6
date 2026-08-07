import { Routes, Route } from "react-router-dom"
import AuthLayout from "../Routes/layouts/AuthLayout"
import LoginPage from "../Features/Auth/Screens/Login/Login"
import Dashboard from "../Features/Home/screens/Dashboard"
import AuthGuard from "../Routes/guards/AuthGuard"

const App = () => {
  return (
    <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
    </Routes>
  );
}
export default App;
