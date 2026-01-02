import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../style/Navbar.css'; 
import { FaPaw } from 'react-icons/fa'; 

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; 
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <FaPaw className="paw-icon" /> PetAdopt 
        </Link>
      </div>

      <div className="nav-center">
        <Link to="/">Home</Link>
        <Link to="/adopt">Adopt</Link>
        <Link to="/success-stories">Success Stories</Link> {/* ADDED THIS */}
        
        {user && (
          <Link to="/add-pet" className="list-pet-link">List a Pet</Link>
        )}

        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="nav-auth">
        {user ? (
          <button onClick={handleLogout} className="login-button logout-btn">
            Logout
          </button>
        ) : (
          <>
            <Link to="/signup" className="signup-button">Signup</Link>
            <Link to="/login" className="login-button">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;