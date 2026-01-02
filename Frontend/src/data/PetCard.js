import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/PetCard.css';

const PetCard = ({ id, name, age, breed, species, image, status, onAdopt, onDelete, isSuccessStory, isManagePage }) => {
  const navigate = useNavigate();
  const isAdopted = status === 'adopted';

  const handleLearnMore = () => {
    navigate(`/pet-details/${id}`);
  };

  return (
    <div className={`pet-card ${isAdopted ? 'adopted-card' : ''}`}>
      <div className="pet-image-container">
        <img src={image} alt={name} className="pet-image" />
        {isAdopted && <div className="status-badge">ADOPTED</div>}
      </div>
      
      <div className="pet-info">
        <h3>{name}</h3>
        <p className="pet-breed-species">{breed || "Unknown"} • {species || "Unknown"}</p>
        <p className="pet-age">Age: {age}</p>
        
        <div className="pet-card-actions">
          {/* Always show Learn More for everyone */}
          <button className="learn-more-btn" onClick={handleLearnMore}>
            LEARN MORE
          </button>

          {isManagePage ? (
            
            <button 
              className="remove-btn" 
              onClick={() => onDelete(id)} 
              style={{backgroundColor: '#d9534f', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', border: 'none'}}
            >
              REMOVE LISTING
            </button>
          ) : (
            isAdopted || isSuccessStory ? (
              <div className="success-label"> FOUND A HOME</div>
            ) : (
              <button className="adopt-btn" onClick={() => onAdopt(id)}>
                ADOPT
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PetCard;