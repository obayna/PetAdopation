import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Footer from './components/Footerr'; 
import Home from './pages/Home';
import Adopt from './pages/Adopt';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddPet from './pages/addPet';
import AdoptionForm from './pages/Adoption'; 
import SuccessStories from './pages/SuccessStories'; 
import PetDetails from './pages/PetDetails'; 

function App() {
  return (
    <div className="App">
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/success-stories" element={<SuccessStories />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/apply-adoption/:petId" element={<AdoptionForm />} />
        
        {/* ADDED THIS ROUTE FOR LEARN MORE */}
        <Route path="/pet-details/:id" element={<PetDetails />} /> 
      </Routes>
      <Footer /> 
    </div>
  );
}

export default App;