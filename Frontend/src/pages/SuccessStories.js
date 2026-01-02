import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PetCard from '../data/PetCard';
import { Link } from 'react-router-dom';
import '../style/Adopt.css'; 

const SuccessStories = () => {
  const [happyPets, setHappyPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8083/pets')
      .then(res => {
        const adoptedOnly = res.data.filter(pet => pet.status === 'adopted');
        setHappyPets(adoptedOnly);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching success stories:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container adopt-container">
      <div className="success-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Happy Tails & Success Stories</h1>
        <p>Warm hearts and forever homes. These pets have found their families!</p>
        
        {happyPets.length > 0 && (
          <div className="adoption-count">
            <span className="count-number">{happyPets.length}</span>
            <p>Lives Changed Forever</p>
          </div>
        )}
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading happy endings...</p>
      ) : happyPets.length > 0 ? (
        <div className="pet-gallery">
          {happyPets.map((pet) => (
            <PetCard 
              key={pet.id} 
              id={pet.id} 
              name={pet.name} 
              age={pet.age} 
              breed={pet.breed} 
              species={pet.species}
              image={pet.image || pet.Image} 
              description={pet.description}
              status={pet.status} 
              isSuccessStory={true} 
            />
          ))}
        </div>
      ) : (
        <div className="empty-success-state" style={{ textAlign: 'center', marginTop: '50px' }}>
           <div style={{ fontSize: '50px' }}>🐾</div>
          <h3>No success stories yet.</h3>
          <p>Be the first to give a pet a forever home!</p>
          <Link to="/adopt" className="cta-button" style={{display: 'inline-block', marginTop: '20px', textDecoration: 'none'}}>
            Browse Pets
          </Link>
        </div>
      )}
    </div>
  );
};

export default SuccessStories;