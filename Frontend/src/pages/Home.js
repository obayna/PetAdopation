import React, { useEffect, useState } from 'react';
import '../style/Home.css'; 
import { useNavigate } from 'react-router-dom';
import PetCard from '../data/PetCard';
import axios from 'axios'; 
import heroImage from '../assets/hero-background.jpg';

const Home = () => {
  const [myPets, setMyPets] = useState([]); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user && user.id) {
      axios.get('https://petadopation-production.up.railway.app/api')
        .then(res => {
          const filtered = res.data.filter(pet => pet.user_id === user.id);
          setMyPets(filtered);
          setError(null);
        })
        .catch(err => {
          console.error("Backend Error:", err);
          setError("Could not connect to the server. Please check if your backend is running on port 8083.");
        });
    } else {
      setMyPets([]); 
    }
  }, [user?.id]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove your listing?")) {
      axios.delete(`https://petadopation-production.up.railway.app/api/${id}`)
        .then(() => setMyPets(myPets.filter(pet => pet.id !== id)))
        .catch(err => console.error(err));
    }
  };

  return (
    <>
      <div className="background-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-content">
          {/* FIX: Only show greeting if user exists. Otherwise show a generic welcome */}
          {user ? (
            <h1 className="par">Welcome, {user.username}!</h1>
          ) : (
            <h1 className="par">Welcome to PetAdopt!</h1>
          )}

          <div className="hero-buttons">
            <button className="cta-button" onClick={() => navigate('/adopt')}>Browse All Pets</button>
            <button className="cta-button secondary" onClick={() => navigate('/add-pet')}>+ List a Pet</button>
          </div>
        </div>
      </div>

      {/* Show an error message if the backend is down */}
      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
          <p>{error}</p>
        </div>
      )}

      {/* Only show this section if user is logged in AND has pets */}
      {user && myPets.length > 0 && (
        <div className="featured-pets-section">
          <h2>Your Listed Pets (Manage)</h2>
          <div className="pet-gallery">
            {myPets.map(pet => (
              <PetCard 
                key={pet.id}
                id={pet.id}
                name={pet.name} 
                age={pet.age}
                breed={pet.breed}
                species={pet.species}
                image={pet.image} 
                status={pet.status}
                onDelete={handleDelete}
                isManagePage={true} 
                petUserId={pet.user_id} 
                currentUserId={user.id} 
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;