import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Adminlogin } from "../api";

export default function Adminslogin() {
  const [formData, setFormData] = useState({ Email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await Adminlogin(formData);

      if (response.error) {
        throw new Error(response.error);
      }

      alert("Admin Login successful");
      localStorage.setItem("isLoggedIna", "true");
      navigate("/");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="logincontainer">
      <h1>Admin Login</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email id:</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div
            className="passwordhide"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
