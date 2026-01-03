import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../style/Adopt.css'; 
import axios from 'axios';
import PetCard from '../data/PetCard';

// Import local images for dummy data
import coolnasir from '../assets/cool-nasi.jpg'; 
import booNasir from '../assets/boo-nasir.png';
import injuredNasir from '../assets/injured-nasir.jpg';
import scaryNasir from '../assets/scary-nasir.jpg';
import sillyNasir from '../assets/silly-nasir.jpg';
import gamerNasir from '../assets/gamer-nasir.jpg';

const dummyPets = [
  { id: 'd1', name: 'Cool Nasir', age: '3 years', breed: 'Domestic Shorthair', image: coolnasir, species: 'Cat', description: "Cool Nasir is a handsome grey cat.", status: 'available' },
  { id: 'd2', name: 'Gamer Nasir', age: '2 years', breed: 'Russian Blue', image: gamerNasir, species: 'Cat', description: "Nasir is a Pro Gamer.", status: 'available' },
  { id: 'd3', name: 'Injured Nasir', age: '4 years', breed: 'British Shorthair', image: injuredNasir, species: 'Cat', description: "On the mend.", status: 'available' },
  { id: 'd4', name: 'Boo Nasir', age: '5 years', breed: 'Chartreux', image: booNasir, species: 'Cat', description: "Spooky personality.", status: 'available' },
  { id: 'd5', name: 'Scary Nasir', age: '3 years', breed: 'Korat', image: scaryNasir, species: 'Cat', description: "Model energy.", status: 'available' },
  { id: 'd6', name: 'Silly Nasir', age: '6 years', breed: 'Tabby Cat', image: sillyNasir, species: 'Cat', description: "Perfect match.", status: 'available' },
];

const Adopt = () => {
  const navigate = useNavigate();
  const [currentDummyPets, setCurrentDummyPets] = useState(dummyPets);
  const [dbPets, setDbPets] = useState([]);
  
  const [searchTerms, setSearchTerms] = useState({
    animalType: 'All Animals',
    ageRange: 'Any Age'
  });

  const [filteredPets, setFilteredPets] = useState(dummyPets); 
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchDbPets = () => {
    // Corrected endpoint to /pets
    axios.get('https://petadopation-production.up.railway.app/pets')
      .then(res => {
        setDbPets(res.data);
        setFilteredPets([...dummyPets, ...res.data]);
      })
      .catch(err => {
        console.error("DB Fetch Error:", err);
        setFilteredPets(dummyPets);
      });
  };

  useEffect(() => {
    fetchDbPets();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const allPets = [...currentDummyPets, ...dbPets];
    const results = allPets.filter(pet => {
      const matchesType = searchTerms.animalType === 'All Animals' || 
                          pet.species === searchTerms.animalType.replace(/s$/, '');
      return matchesType;
    });
    setFilteredPets(results);
  };

  const handleAdopt = (id) => {
    if (!user) {
      alert("Please login first to adopt!");
      return;
    }
    navigate(`/apply-adoption/${id}`);
  };

  return (
    <div className="page-container adopt-container">
      <h1>Adopt a Pet</h1>
      <div className="filter-bar">
        <select name="animalType" onChange={handleInputChange} className="filter-select">
          <option>All Animals</option>
          <option>Dogs</option>
          <option>Cats</option>
        </select>
        <button className="cta-button" onClick={applyFilters}>Search</button>
      </div>

      <div className="pet-gallery">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <PetCard 
              key={pet.id} 
              id={pet.id} 
              name={pet.name} 
              age={pet.age} 
              breed={pet.breed} 
              species={pet.species}
              image={pet.Image || pet.image} 
              description={pet.description}
              status={pet.status} 
              onAdopt={handleAdopt}
              petUserId={pet.user_id}
              currentUserId={user ? user.id : null}
            />
          ))
        ) : (
          <p className="no-results-msg">No pets found matching those filters.</p>
        )}
      </div>
    </div>
  );
};

export default Adopt;