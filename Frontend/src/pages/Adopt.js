import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../style/Adopt.css'; 
import axios from 'axios';
import PetCard from '../data/PetCard';


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
    axios.get('https://petadopation-production.up.railway.app/api/')
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

  const parseAgeToNumber = (ageStr) => {
    if (!ageStr) return 0;
    const str = ageStr.toString().toLowerCase();
    const num = parseFloat(str);
    if (str.includes('month')) return num / 12; 
    return num;
  };

  const applyFilters = () => {
    const allPets = [...currentDummyPets, ...dbPets];

    const results = allPets.filter(pet => {
      const matchesType = searchTerms.animalType === 'All Animals' || 
                          pet.species === searchTerms.animalType.replace(/s$/, '');

      const petAgeNum = parseAgeToNumber(pet.age);
      let matchesAge = false;

      if (searchTerms.ageRange === 'Any Age') {
        matchesAge = true;
      } else if (searchTerms.ageRange === '0 - 1 year') {
        matchesAge = petAgeNum >= 0 && petAgeNum <= 1;
      } else if (searchTerms.ageRange === '1 - 3 years') {
        matchesAge = petAgeNum > 1 && petAgeNum <= 3;
      } else if (searchTerms.ageRange === '3 - 5 years') {
        matchesAge = petAgeNum > 3 && petAgeNum <= 5;
      } else if (searchTerms.ageRange === '5+ years') {
        matchesAge = petAgeNum > 5;
      }

      return matchesType && matchesAge;
    });

    setFilteredPets(results);
  };

  const handleAdopt = (id) => {
    if (!user) {
      alert("Please login first to adopt!");
      return;
    }
    if (id.toString().startsWith('d')) {
        setCurrentDummyPets(prev => prev.map(pet => pet.id === id ? {...pet, status: 'adopted'} : pet));
    }
    navigate(`/apply-adoption/${id}`);
  };

  return (
    <div className="page-container adopt-container">
      <h1>Adopt a Pet</h1>
      <p>Find your new best friend from our available pets.</p>
      
      <div className="filter-bar">
        <select name="animalType" onChange={handleInputChange} className="filter-select">
          <option>All Animals</option>
          <option>Dogs</option>
          <option>Cats</option>
        </select>

        <select name="ageRange" onChange={handleInputChange} className="filter-select">
          <option>Any Age</option>
          <option>0 - 1 year</option>
          <option>1 - 3 years</option>
          <option>3 - 5 years</option>
          <option>5+ years</option>
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
              image={pet.image || pet.Image} 
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