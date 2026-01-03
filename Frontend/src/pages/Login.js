import React, { useState } from 'react';
import '../style/Login.css'; 
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); 
    
    axios.post('https://petadoption-production.up.railway.app/login', { email, password })
      .then(res => {
        if(res.data.message === "Success") {
          alert("Login Successful!");
          
          localStorage.setItem("user", JSON.stringify(res.data.user));
          
          navigate('/home'); 
        } else {
          alert("Invalid Email or Password. Please try again.");
        }
      })
      .catch(err => {
        console.error("Login Error:", err);
        alert("Server error. Please make sure your backend is running.");
      });
  };

  return (
    <div className="page-container auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        <p>Please log in to continue.</p>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <button type="submit" className="cta-button">
          Login
        </button>
        <div className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;