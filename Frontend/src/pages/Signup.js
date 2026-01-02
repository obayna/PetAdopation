import React, { useState } from 'react';
import '../style/Signup.css'; 
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    axios.post('https://petadoption-production.up.railway.app', { 
        username: name, 
        email: email, 
        password: password 
    })
    .then(res => {
        alert("Account created successfully!");
        navigate('/login'); 
    })
    .catch(err => {
        console.error("Signup error details:", err);
        alert("Registration failed. Please make sure your backend server and XAMPP/MySQL are running.");
    });
  };

  return (
    <div className="page-container auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>
        <p>Join our community and find your new friend.</p>

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit" className="cta-button">Create Account</button>
        <div className="auth-switch">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;