import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { login } from "../api";
import "./login.scss";
import { FaRegEye ,FaRegEyeSlash} from "react-icons/fa";


import googlelogo from '../media/search.png'

export default function Login() {
  const [formData, setFormData] = useState({ Email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      // await auth.signInWithEmailAndPassword(formData.email, formData.password);
      localStorage.setItem("isLoggedIn", "true");
      alert("Login successful");
      navigate("/");
    
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error(err);
   
    }
  };



  const handleGoogleLogin = async () => {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      const user = result.user;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ email: user.email, profileImage: user.photoURL }));
      alert("Google Login successful");
      navigate("/");
    } catch (error) {
      console.error("Google Login Failed:", error);
      alert("Google Login failed. Please try again.");
    }
  };

  return (
    <div className="logincontainer">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
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
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="passwordhide" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaRegEyeSlash />: <FaRegEye />}
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account ? <Link to="/signup">Sign up here</Link>
      </p>
      <button onClick={handleGoogleLogin}>
    <div className="signingoogle">
    <img src={googlelogo} alt="google logo"/>
    Sign in with Google
    </div>
        </button>
      
    </div>
  );
} 