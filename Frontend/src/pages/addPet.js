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

  // FIXED: Added automatic image compression to prevent 404/Large Payload errors
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800; // Resize to a max width of 800px
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Convert to JPEG with 0.7 quality (drastically reduces string size)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          setFormData({ ...formData, image: compressedBase64 });
        };
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(!formData.image) {
        alert("Please select a photo of the pet.");
        return;
    }

    // URL NOTE: Ensure 'petadopation' is spelled exactly as it appears in your Railway dashboard
    axios.post('https://petadopation-production.up.railway.app/api/add-pet', { 
        ...formData, 
        user_id: user.id 
    })
      .then((res) => {
        console.log("Response:", res.data);
        alert("Pet listed successfully!");
        navigate('/'); 
      })
      .catch((err) => {
        console.error("Full Error Object:", err);
        if (err.response && err.response.status === 404) {
            alert("Error 404: The server received the request but the route /add-pet was not found. Did you push your server.js changes to GitHub?");
        } else {
            alert("Error adding pet. The image might still be too large or the server is struggling.");
        }
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
              <div className="file-input-container">
                <label htmlFor="file-upload" className="custom-file-upload">
                  {formData.image ? "✅ Photo Ready" : "📷 Upload Photo"}
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

            {formData.image && (
                <div className="image-preview">
                    <img src={formData.image} alt="Preview" style={{maxWidth: '200px', borderRadius: '8px'}} />
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