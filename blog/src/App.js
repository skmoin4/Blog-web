import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog from "./hero/HeroPage";
import Login from "./login/login";
import SignUp from "./signup/signup";
import Blogwriteform from "./blogwriteform/blogwriteform";
import ViewBlog from "./viewblog/viewblog";
import ProtectedRoute from "./protectedRoute.js";
import Navbar from "./navbar/Navbar.jsx";
import Adminlogin from "./adminlogin/adminlogin.jsx";
import AdminPanel from "./adminpanel/Adminpanel.js";
import FavBlog from "./favblog/favblog.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/userlogin" element={<>
          <Navbar />
          <Login /></>
           } />

        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Blog />
            </>
          }
        />
        <Route
          path="/adminpanel"
          element={
            <>
              <Navbar />
              <AdminPanel />
            </>
          }
        />
        <Route
          path="/write"
          element={
            <ProtectedRoute>
                  <Navbar />
              <Blogwriteform />
            </ProtectedRoute>
          }
        />
           <Route
          path="/favblog"
          element={
            <ProtectedRoute>
                  <Navbar />
              <FavBlog/>
            </ProtectedRoute>
          }
        />
        <Route path="/view/:id" element={
          <>
                <Navbar />
          <ViewBlog />
    </>} />
      </Routes>
    </Router>
  );
}

export default App;
