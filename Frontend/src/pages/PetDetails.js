import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Adopt.css'; 


import coolnasir from '../assets/cool-nasi.jpg'; 
import booNasir from '../assets/boo-nasir.png';
import injuredNasir from '../assets/injured-nasir.jpg';
import scaryNasir from '../assets/scary-nasir.jpg';
import sillyNasir from '../assets/silly-nasir.jpg';
import gamerNasir from '../assets/gamer-nasir.jpg';

const dummyPets = [
  { id: 'd1', name: 'Cool Nasir', age: '3 years', breed: 'Domestic Shorthair', image: coolnasir, species: 'Cat', description: "Cool Nasir is a handsome grey cat who enjoys high vantage points and scenic views. He is very well-behaved, quiet, and enjoys his own space. He is looking for a forever home where he can lounge in the sun and keep an eye on things..", status: 'available' },
  { id: 'd2', name: 'Gamer Nasir', age: '2 years (In his prime gaming years)', breed: 'Russian Blue ', image: gamerNasir, species: 'Cat', description: "Nasir is a Pro Gamer in every sense of the word. He excels at sitting quietly by your side while you climb the ranks, offering moral support with a flick of his tail. While he might look serious in his profile picture, he's actually a low-latency companion who loves a good chin scratch between rounds.", status: 'available' },
  { id: 'd3', name: 'Injured Nasir', age: '4 years', breed: 'British Shorthair', image: injuredNasir, species: 'Cat', description: "Despite his name, Injured Nasir is officially on the mend and feeling better now. He is a 4-year-old pet—noted as a British Shorthair in his profile—who is currently available and looking for a patient, loving home to help him finish his recovery journey.", status: 'available' },
  { id: 'd4', name: 'Boo Nasir', age: '5 years', breed: 'Chartreux ', image: booNasir, species: 'Cat', description: "a Chartreux, Boo Nasir is a 6-month-old kitten with a flair for the dramatic. He’s currently available and ready to haunt your heart with his big eyes and spooky personality.", status: 'available' },
  { id: 'd5', name: 'Scary Nasir', age: '3 years', breed: 'Korat', image: scaryNasir, species: 'Cat', description: "Don't let the name or the dramatic lighting fool you—Scary Nasir is a 3-year-old sweetheart who is not actually scary. While his profile currently lists him as a Korat, he is clearly a majestic grey cat with very intense model energy..", status: 'available' },
  { id: 'd6', name: 'Silly Nasir', age: '6 years', breed: 'Tabby Cat', image: sillyNasir, species: 'Cat', description: "Meet Silly Nasir, a 5-year-old Tabby Cat who lives up to his name every single day. Currently available for adoption, he is the perfect match for someone who doesn't take life too seriously.", status: 'available' },
];

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    if (id && id.toString().startsWith('d')) {
      const foundDummy = dummyPets.find(p => p.id === id);
      setPet(foundDummy);
    } else {
      axios.get('https://petadopation-production.up.railway.app')
        .then(res => {
          const foundDbPet = res.data.find(p => p.id.toString() === id.toString());
          setPet(foundDbPet);
        })
        .catch(err => console.error("Error fetching pet details:", err));
    }
  }, [id]);

  if (!pet) return <div className="page-container">Loading pet details...</div>;

  return (
    <div className="page-container pet-details-container" style={{ padding: '40px' }}>
      <button className="back-btn" onClick={() => navigate(-1)} style={{ marginBottom: '20px', cursor: 'pointer' }}>
        ← Back to Gallery
      </button>
      
      <div className="details-layout" style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flex: 1 }}>
          <img 
            src={pet.image || pet.Image} 
            alt={pet.name} 
            style={{ width: '100%', borderRadius: '15px', maxHeight: '500px', objectFit: 'cover' }} 
          />
        </div>
        
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '3rem', margin: '0' }}>{pet.name}</h1>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>{pet.breed} • {pet.species}</p>
          <hr />
          <h3>Details</h3>
          <p><strong>Age:</strong> {pet.age}</p>
          <p><strong>Status:</strong> {pet.status}</p>
          <p style={{ marginTop: '20px', lineHeight: '1.6' }}>{pet.description}</p>
          
          {pet.status === 'available' && (
            <button 
              className="cta-button" 
              onClick={() => navigate(`/apply-adoption/${pet.id}`)}
              style={{ marginTop: '20px', width: '100%', padding: '15px' }}
            >
              Start Adoption Process
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetDetails;