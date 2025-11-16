import React from "react";
import { Link } from "react-router-dom";
import '../style/Navbar.css'; 
import { FaPaw } from 'react-icons/fa'; 

const Navbar = () => {
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
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="nav-auth">
        <Link to="/signup" className="signup-button">
          Signup
        </Link>
        <Link to="/login" className="login-button">
          Login
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;