// pages/Login.jsx
// Login with Backend Integration

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserLock } from "react-icons/fa";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      // Redirect
      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="card">

        <h2>
          <FaUserLock /> Employee Login
        </h2>

        <form onSubmit={handleLogin}>

          <input
            className="input"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="input"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="link-text">
          New User? <a href="/register">Register</a>
        </div>

      </div>
    </div>
  );
}

export default Login;
