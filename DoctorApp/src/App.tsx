import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Features/Dashboard";
import Login from "./Features/Auth/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
