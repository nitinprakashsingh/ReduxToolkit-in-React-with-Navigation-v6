import { useState } from "react";
import LoginScreen from "../Features/Auth/Login";
import HomeScreen from "../Features/Home/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    isAuthenticated ? (
      <HomeScreen onSignOut={() => setIsAuthenticated(false)} />
    ) : (
      <LoginScreen onLogin={() => setIsAuthenticated(true)} />
    )
  );
}

export default App;
