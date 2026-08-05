import { useState } from "react";
import LoginScreen from "../Features/Auth/Login";
import HomeScreen from "../Features/Home/Home";

const authStorageKey = "patient-app-demo-authenticated";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => window.localStorage.getItem(authStorageKey) === "true");

  const handleLogin = () => {
    window.localStorage.setItem(authStorageKey, "true");
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    window.localStorage.removeItem(authStorageKey);
    setIsAuthenticated(false);
  };

  return (
    isAuthenticated ? (
      <HomeScreen onSignOut={handleSignOut} />
    ) : (
      <LoginScreen onLogin={handleLogin} />
    )
  );
}

export default App;
