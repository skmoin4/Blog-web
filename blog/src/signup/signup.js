   import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api";
import './signup.scss';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    Email: "",
    Mobilenumber: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(formData);
      localStorage.setItem("isLoggedIn", "true"); // Set login status to true
      alert("Sign up successful");
      navigate("/userlogin");  // Redirect to login after successful sign-up
    } catch (err) {
      console.error(err);
      alert("Error signing up");
    }
  };

  return (
    <div className="signupcontainer">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email id:</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="Mobilenumber"
            value={formData.Mobilenumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
