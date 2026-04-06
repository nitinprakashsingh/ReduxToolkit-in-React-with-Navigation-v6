import { Routes, Route } from "react-router-dom"
import AuthLayout from "../Routes/layouts/AuthLayout"
import LoginPage from "../Features/Auth/Screens/Login/Login"
import SignupPage from "../Features/Auth/Screens/SignUp/Signup"

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
    </Routes>
  );
}
export default App;