import React from 'react';
import '../style/PetCard.css';


const PetCard = ({ name, age, breed, image }) => {
  return (
    <div className="pet-card">
      <div className="pet-card-image">
        <img src={image} alt={`A pet named ${name}`} />
      </div>
      <div className="pet-card-info">
        <h3>{name}</h3>
        <p>{age} • {breed}</p>
      </div>
      <button className="cta-button pet-card-button">
        Learn More
      </button>
    </div>
  );
};

export default PetCard;