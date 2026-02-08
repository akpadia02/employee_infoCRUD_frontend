// pages/Dashboard.jsx
// Final Professional Dashboard

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    salary: "",
  });

  // Protect Route
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    fetchEmployees();
  }, []);

  // Fetch Employees
  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch {
      alert("Failed to load employees");
    }
  };

  // Handle Input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/employees/${editId}`, form);
        alert("Employee Updated ✅");
      } else {
        await API.post("/employees", form);
        alert("Employee Added ✅");
      }

      resetForm();
      fetchEmployees();

    } catch {
      alert("Operation Failed");
    }
  };

  // Reset
  const resetForm = () => {
    setShowForm(false);
    setEditId(null);

    setForm({
      name: "",
      email: "",
      department: "",
      designation: "",
      salary: "",
    });
  };

  // Edit
  const handleEdit = (emp) => {
    setForm(emp);
    setEditId(emp._id);
    setShowForm(true);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete employee?")) return;

    try {
      await API.delete(`/employees/${id}`);
      alert("Deleted ✅");
      fetchEmployees();
    } catch {
      alert("Delete Failed");
    }
  };

  return (
    <div>

      <Navbar />

      <div className="container">

        {/* Header */}
        <div className="dashboard-header">

          <h2>Employees</h2>

          <button
            className="btn"
            onClick={() => setShowForm(true)}
          >
            <FaPlus /> Add Employee
          </button>

        </div>

        {/* Form */}
        {showForm && (
          <div className="form-wrapper">

            <div className="card" style={{ width: "450px" }}>

              <h3 style={{ textAlign: "center", color: "#1565c0" }}>
                {editId ? "Edit Employee" : "Add Employee"}
              </h3>

              <form onSubmit={handleSubmit}>

                <input
                  className="input"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <input
                  className="input"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                <input
                  className="input"
                  name="department"
                  placeholder="Department"
                  value={form.department}
                  onChange={handleChange}
                  required
                />

                <input
                  className="input"
                  name="designation"
                  placeholder="Designation"
                  value={form.designation}
                  onChange={handleChange}
                  required
                />

                <input
                  className="input"
                  type="number"
                  name="salary"
                  placeholder="Salary"
                  value={form.salary}
                  onChange={handleChange}
                  required
                />

                <button className="btn" style={{ width: "100%" }}>
                  {editId ? "Update" : "Save"}
                </button>

                <button
                  type="button"
                  className="btn btn-gray"
                  style={{ width: "100%", marginTop: "10px" }}
                  onClick={resetForm}
                >
                  Cancel
                </button>

              </form>

            </div>

          </div>
        )}

        {/* Table */}
        <div className="card table-card">

          <table>

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Dept</th>
                <th>Role</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {employees.length === 0 ? (

                <tr>
                  <td colSpan="6" align="center">
                    No Employees
                  </td>
                </tr>

              ) : (

                employees.map((emp) => (

                  <tr key={emp._id}>

                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>{emp.designation}</td>
                    <td>₹{emp.salary}</td>

                    <td>

                      <FaEdit
                        style={{
                          cursor: "pointer",
                          color: "#1e88e5",
                          marginRight: "12px",
                        }}
                        onClick={() => handleEdit(emp)}
                      />

                      <FaTrash
                        style={{
                          cursor: "pointer",
                          color: "red",
                        }}
                        onClick={() => handleDelete(emp._id)}
                      />

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
