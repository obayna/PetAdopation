import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Adoption.css';

const AdoptionForm = () => {
  const { petId } = useParams(); 
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    fullName: user ? user.username : '',
    email: user ? user.email : '',
    phone: '',
    address: '',
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (petId.startsWith('d')) {
      alert(`Application sent for Nasir! We will contact you at ${formData.phone}. `);
      navigate('/adopt');
      return;
    }

   
    axios.put(`http://localhost:8083/adopt-pet/${petId}`)
      .then(() => {
        alert("Application submitted successfully! The pet is now reserved for you. ");
        navigate('/adopt');
      })
      .catch(err => console.error("Adoption Error:", err));
  };

  return (
    <div className="form-container">
      <h2>Adoption Application</h2>
      <p>You are applying to adopt Pet ID: {petId}</p>
      <form onSubmit={handleSubmit} className="adoption-form">
        <input 
          type="text" placeholder="Full Name" required 
          value={formData.fullName} 
          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
        />
        <input 
          type="email" placeholder="Email Address" required 
          value={formData.email} 
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="text" placeholder="Phone Number" required 
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
        <textarea 
          placeholder="Why do you want to adopt this pet?" required 
          onChange={(e) => setFormData({...formData, reason: e.target.value})}
        ></textarea>
        <button type="submit" className="submit-form-btn">SUBMIT APPLICATION</button>
      </form>
    </div>
  );
};

export default AdoptionForm;