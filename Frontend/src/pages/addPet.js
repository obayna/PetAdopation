import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/addPet.css'; 
import heroImage from '../assets/hero-background.jpg'; 

const AddPet = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [formData, setFormData] = useState({ 
    name: '', 
    species: '', 
    age: '', 
    image: '', 
    description: '' 
  });

  useEffect(() => {
    if (!user) {
      alert("Please login first!");
      navigate('/login');
    }
  }, [user, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(!formData.image) {
        alert("Please select a photo of the pet.");
        return;
    }

    axios.post('https://petadopation-production.up.railway.app/add-pet', { ...formData, user_id: user.id })
      .then(() => {
        alert("Pet listed successfully!");
        navigate('/'); 
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding pet. The image might be too large or the server is down.");
      });
  };

  return (
    <div className="add-pet-page" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="overlay">
        <div className="add-pet-card">
          <h2>List a New Pet</h2>
          <p>Select a photo and fill in the details.</p>
          
          <form onSubmit={handleSubmit} className="styled-form">
            <div className="form-row">
              <input 
                type="text" 
                placeholder="Pet Name" 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                required 
              />
              <input 
                type="text" 
                placeholder="Species" 
                onChange={e => setFormData({...formData, species: e.target.value})} 
                required 
              />
            </div>

            <div className="form-row">
              <input 
                type="number" 
                placeholder="Age" 
                onChange={e => setFormData({...formData, age: e.target.value})} 
                required 
              />
              {/* FILE INPUT REPLACES URL INPUT */}
              <div className="file-input-container">
                <label htmlFor="file-upload" className="custom-file-upload">
                  {formData.image ? "✅ Photo Selected" : "📷 Upload Photo"}
                </label>
                <input 
                  id="file-upload"
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange} 
                  required 
                />
              </div>
            </div>

            <textarea 
              placeholder="Tell us a bit about the pet..." 
              onChange={e => setFormData({...formData, description: e.target.value})}
              required
            ></textarea>

            {/* PREVIEW: Shows the user the image they picked */}
            {formData.image && (
                <div className="image-preview">
                    <img src={formData.image} alt="Preview" />
                </div>
            )}

            <button type="submit" className="cta-button">SUBMIT LISTING</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPet;