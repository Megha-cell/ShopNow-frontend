import { useState } from "react";
import secureAxios from "../utils/secureAxios";
//import axios from 'axios';

import { useNavigate } from "react-router-dom";
import "../css/Login.css"; // Use same styling as login

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await secureAxios.post("/auth/register", formData);

      const loginRes = await secureAxios.post("/auth/login", {
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem("token", loginRes.data.token);
      setSuccess("Registered Successfully! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="myshop-login-container">
      <div className="myshop-login-box">
      <div className="myshop-login-brand">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="shopnow-logo"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.9L4.24 7 12 3.1 19.76 7 12 9.9zm0 2.1l10-5v6c0 5.25-3.84 9.68-9 10-5.16-.32-9-4.75-9-10V9l10 5z" />
  </svg>
  <span>ShopNow</span>
</div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="myshop-login-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="myshop-login-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="myshop-login-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="myshop-login-btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
