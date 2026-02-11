// // pages/Register.jsx
// // Register with Backend

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUserPlus } from "react-icons/fa";
// import API from "../services/api";

// function Register() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       await API.post("/auth/register", {
//         name,
//         email,
//         password,
//       });

//       alert("Registration Successful ✅");

//       navigate("/");

//     } catch (error) {
//       alert(error.response?.data?.message || "Registration Failed");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="card">

//         <h2>
//           <FaUserPlus /> Create Account
//         </h2>

//         <form onSubmit={handleRegister}>

//           <input
//             className="input"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />

//           <input
//             className="input"
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             className="input"
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button className="btn">
//             Register
//           </button>

//         </form>

//         <div className="link-text">
//           Already Registered? <a href="/">Login</a>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Register;



// pages/Register.jsx
// Register with Validation UI

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUserPlus,
  FaExclamationCircle,
} from "react-icons/fa";

import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= VALIDATE =================
  const validate = () => {
    let temp = {};

    if (!form.name)
      temp.name = "Name is required";

    if (!form.email)
      temp.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      temp.email = "Invalid email format";

    if (!form.password)
      temp.password = "Password required";
    else if (form.password.length < 6)
      temp.password = "Minimum 6 characters";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  // ================= SUBMIT =================
  const handleRegister = async (e) => {
    e.preventDefault();

    setServerError("");

    if (!validate()) return;

    try {
      setLoading(true);

      await API.post("/auth/register", form);

      navigate("/");

    } catch (error) {
      setServerError(
        error.response?.data?.error ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= INPUT =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  return (
    <div className="auth-container">

      <div className="card">

        <h2>
          <FaUserPlus /> Create Account
        </h2>

        <form onSubmit={handleRegister}>

          {/* NAME */}
          <input
            className={`input ${
              errors.name ? "input-error" : ""
            }`}
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          {errors.name && (
            <p className="error-text">
              <FaExclamationCircle />
              {errors.name}
            </p>
          )}

          {/* EMAIL */}
          <input
            className={`input ${
              errors.email ? "input-error" : ""
            }`}
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
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
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
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
              ? "Registering..."
              : "Register"}
          </button>

        </form>

        <div className="link-text">
          Already Registered?{" "}
          <a href="/">Login</a>
        </div>

      </div>
    </div>
  );
}

export default Register;
