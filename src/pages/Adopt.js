
import React from 'react';
import '../style/Adopt.css'; 
import coolnasir from '../assets/cool-nasi.jpg'; 
import booNasir from '../assets/boo-nasir.png';
import injuredNasir from '../assets/injured-nasir.jpg';
import scaryNasir from '../assets/scary-nasir.jpg';
import sillyNasir from '../assets/silly-nasir.jpg';
import gamerNasir from '../assets/gamer-hitler.jpg';
import PetCard from '../data/PetCard';


const dummyPets = [
  { id: 1, name: 'Cool Nasir', age: '3 years', breed: 'Golden Retriever Mix', image: coolnasir},
  { id: 2, name: 'Gamer Nasir', age: '2 year', breed: 'Domestic Shorthair', image: gamerNasir },
  { id: 3, name: 'Injured Nasir', age: '4 years', breed: 'Beagle', image: injuredNasir },
  { id: 4, name: 'Boo Nasir', age: '6 months', breed: 'Labrador Mix', image: booNasir },
  { id: 5, name: 'Scary Nasir', age: '3 years', breed: 'German Shepherd', image: scaryNasir },
  { id: 6, name: 'Silly Nasir', age: '5 years', breed: 'Tabby Cat', image: sillyNasir },
];

const Adopt = () => {
  return (
    <div className="page-container adopt-container">
      <h1>Adopt a Pet</h1>
      <p>Find your new best friend from our available pets.</p>
      <div className="filter-bar">
        <select name="animal-type">
          <option value="">All Animals</option>
          <option value="dog">Dogs</option>
          <option value="cat">Cats</option>
          <option value="other">Other</option>
        </select>
        <select name="age">
          <option value="">Any Age</option>
          <option value="young">Young</option>
          <option value="adult">Adult</option>
          <option value="senior">Senior</option>
        </select>
        <select name="size">
          <option value="">Any Size</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <button className="cta-button secondary-button">Search</button>
      </div>
      <div className="pet-gallery">
        {dummyPets.map(pet => (
          <PetCard 
            key={pet.id} 
            name={pet.name} 
            age={pet.age} 
            breed={pet.breed} 
            image={pet.image} 
          />
        ))}
      </div>
    </div>
  );
};

export default Adopt;