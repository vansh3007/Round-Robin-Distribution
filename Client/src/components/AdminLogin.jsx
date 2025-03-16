import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://round-robin-distribution.onrender.com/api/admin/login",
        credentials
      );
      localStorage.setItem("token", res.data.token);
      navigate("/admin-dashboard");
    } catch (err) {
      setError("Invalid credentials!");
    }
  };

  return (
    <div id="homepage">
      <div className="home-container">
        <a href="/" style={{ position: "absolute", top: 30, left: 30 }}>
          <i className="fa-solid fa-left-long admin-icon"></i> Back to User
          Dashboard
        </a>
        <div className="admin-container">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin} className="admin-form">
            <input
              type="email"
              placeholder="Email"
              className="adminLoginInput"
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="adminLoginInput"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
            <button type="submit" className="adminLoginButton">
              Login
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}



