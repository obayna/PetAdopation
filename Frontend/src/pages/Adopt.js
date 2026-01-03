// ... (imports remain the same)

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

  // --- FIXED FETCH FUNCTION ---
  const fetchDbPets = () => {
    // FIXED: Changed '/api/' to '/pets' to match your server.js
    axios.get('https://petadopation-production.up.railway.app/pets')
      .then(res => {
        setDbPets(res.data);
        // Merge dummy data with real database data
        setFilteredPets([...dummyPets, ...res.data]);
      })
      .catch(err => {
        console.error("DB Fetch Error:", err);
        // Fallback to dummy pets if server is down
        setFilteredPets(dummyPets);
      });
  };

  useEffect(() => {
    fetchDbPets();
  }, []);

  // ... (applyFilters and handleInputChange remain the same)

  const handleAdopt = (id) => {
    if (!user) {
      alert("Please login first to adopt!");
      return;
    }
    // Logic for dummy pets
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
        {/* ... (filter inputs remain the same) */}
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
              // FIXED: Prioritize uppercase 'Image' from DB, fallback to 'image' for dummy data
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