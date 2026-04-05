import {Routes, Route} from "react-router-dom"
import AuthLayout from "./Routes/layouts/AuthLayout"
import RootLayout from "./Routes/layouts/RootLayout"
import DashboardLayout from "./Routes/layouts/DashboardLayout"

import AuthGuard from "./Routes/guards/AuthGuard"
import RoleGuard from "./Routes/guards/RoleGuard"

import LoginPage from "./Routes/pages/LoginPage"
import SignupPage from "./Routes/pages/SignupPage"

const App = () => {
  return (
    <Routes>

      <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
      <Route path="/signup" element={<AuthLayout><SignupPage /></AuthLayout>} />
    </Routes>
  )
}
export default App;