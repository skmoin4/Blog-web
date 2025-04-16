import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import "./navbar.scss";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isLoggedIna = localStorage.getItem("isLoggedIna");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [showDropdown, setShowDropdown] = useState(false);
  const defaultProfileImage =
    "https://plus.unsplash.com/premium_photo-1732333561328-fb8ff00d3665?q=80&w=1947&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isLoggedIna");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="navcontainer">
      <div className="left">
        <div onClick={() => navigate("/")}>Home</div>
        {isLoggedIn && (
          <div>
            <div onClick={() => navigate("/write")}>Upload Post</div>
            <div onClick={()=>navigate("/favblog")}>Fav blogs</div>
          </div>
        )}
        {isLoggedIna && <div onClick={() => navigate("/adminpanel")}>Admin Panel</div>}



      </div>

      <div className="rdiv">
        {isLoggedIn || isLoggedIna ? (
          <div className="userprofile">
            <img src={user.profileImage || defaultProfileImage} alt="profile" />
            {/* <span>{user.email || defaultProfileImage}</span> */}

            <button onClick={toggleDropdown}>Logout</button>
            {showDropdown && (
              <div className="logoutdropdown">

                <p>are you sure you want to logout?</p>


                <div>
                  <button onClick={handleLogout}>Yes</button>
                  <button onClick={toggleDropdown}>No</button>
                </div>



              </div>
            )}
            <IoNotificationsOutline />

          </div>
        ) : (
          <div className="login-dropdown">
            <button onClick={toggleDropdown}>Login</button>
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => navigate("/userlogin")}>User Login</button>
                <button onClick={() => navigate("/adminlogin")}>Admin Login</button>
              </div>
            )}

          </div>

        )}
      </div>


    </div>
  );
}
