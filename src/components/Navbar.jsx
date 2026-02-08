// components/Navbar.jsx
// Dashboard Navbar

import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        background: "#1e88e5",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>Employee Manager</h2>

      <button
        onClick={logout}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "15px",
          cursor: "pointer",
        }}
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}

export default Navbar;
