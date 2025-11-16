import React from 'react';
import '../style/Home.css'; 
import { useNavigate } from 'react-router-dom';
import PetCard from '../data/PetCard';
import heroImage from '../assets/hero-background.jpg';
import coolnasir from '../assets/cool-nasi.jpg';
import booNasir from '../assets/boo-nasir.png';
import injuredNasir from '../assets/injured-nasir.jpg';

const dummyPets = [
  { id: 1, name: 'Cool Nasir', age: '1 years', breed: 'Golden Retriever Mix', image: coolnasir },
  { id: 4, name: 'Boo Nasir', age: '6 months', breed: 'Labrador Mix', image: booNasir },
  { id: 3, name: 'Injured Nasir', age: '4 years', breed: 'Beagle', image: injuredNasir },
];
const featuredPets = dummyPets.slice(0, 3);

const Home = () => {
  const navigate = useNavigate();
  const handleBrowsePets = () => {
    navigate('/adopt');
  };
  return (
    <>
      <div 
        className="hero-section" 
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay"></div> 
        <div className="hero-content">
          <h1  className="par">Find Your New Best Friend</h1>
          <p className="par">Welcome to PetAdopt. Browse our available pets and find the perfect companion.</p>
          <button className="cta-button" onClick={handleBrowsePets}>
            Browse Pets
          </button>
        </div>
      </div>
      <div className="featured-pets-section">
        <h2>Meet Some Friends</h2>
        <p>These pets are waiting for a loving home.</p>
        <div className="pet-gallery">
          {featuredPets.map(pet => (
            <PetCard 
              key={pet.id} 
              name={pet.name} 
              age={pet.age} 
              breed={pet.breed} 
              image={pet.image} 
            />
          ))}
        </div>
        <button className="cta-button secondary-button" onClick={handleBrowsePets}>
          See All Pets
        </button>
      </div>
    </>
  );
};

export default Home;