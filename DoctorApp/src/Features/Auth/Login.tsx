import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Doctor login", { email, password });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <form onSubmit={handleSubmit} style={{ width: 360, padding: 32, borderRadius: 16, background: "#fff", boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}>
        <h1 style={{ marginBottom: 24, fontSize: 24 }}>Doctor Login</h1>
        <label style={{ display: "block", marginBottom: 12 }}>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{ width: "100%", padding: 12, marginTop: 8, borderRadius: 8, border: "1px solid #dfe3ea" }}
            required
          />
        </label>
        <label style={{ display: "block", marginBottom: 20 }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{ width: "100%", padding: 12, marginTop: 8, borderRadius: 8, border: "1px solid #dfe3ea" }}
            required
          />
        </label>
        <button type="submit" style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "#4f46e5", color: "white", fontWeight: 700, cursor: "pointer" }}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
