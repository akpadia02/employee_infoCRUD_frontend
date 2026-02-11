// // pages/Login.jsx
// // Login with Backend Integration

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUserLock } from "react-icons/fa";
// import API from "../services/api";

// function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Handle Login
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const res = await API.post("/auth/login", {
//         email,
//         password,
//       });

//       // Save token
//       localStorage.setItem("token", res.data.token);

//       // Redirect
//       navigate("/dashboard");

//     } catch (error) {
//       alert(error.response?.data?.message || "Login Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="card">

//         <h2>
//           <FaUserLock /> Employee Login
//         </h2>

//         <form onSubmit={handleLogin}>

//           <input
//             className="input"
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             className="input"
//             type="password"
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button className="btn" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>

//         </form>

//         <div className="link-text">
//           New User? <a href="/register">Register</a>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Login;


// pages/Login.jsx
// Login with Validation UI

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserLock,
  FaExclamationCircle,
} from "react-icons/fa";

import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= VALIDATE =================
  const validate = () => {
    let temp = {};

    if (!email)
      temp.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      temp.email = "Invalid email format";

    if (!password)
      temp.password = "Password is required";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  // ================= SUBMIT =================
  const handleLogin = async (e) => {
    e.preventDefault();

    setServerError("");

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (error) {
      setServerError(
        error.response?.data?.error ||
          "Login Failed"
      );
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

          {/* EMAIL */}
          <input
            className={`input ${
              errors.email ? "input-error" : ""
            }`}
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: "" });
            }}
          />

          {errors.email && (
            <p className="error-text">
              <FaExclamationCircle />
              {errors.email}
            </p>
          )}

          {/* PASSWORD */}
          <input
            className={`input ${
              errors.password ? "input-error" : ""
            }`}
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({
                ...errors,
                password: "",
              });
            }}
          />

          {errors.password && (
            <p className="error-text">
              <FaExclamationCircle />
              {errors.password}
            </p>
          )}

          {/* SERVER ERROR */}
          {serverError && (
            <p className="error-text">
              <FaExclamationCircle />
              {serverError}
            </p>
          )}

          {/* BUTTON */}
          <button
            className="btn"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <div className="link-text">
          New User?{" "}
          <a href="/register">Register</a>
        </div>

      </div>
    </div>
  );
}

export default Login;
