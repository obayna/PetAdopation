import React from 'react';
import '../style/About.css'; 
import { FaHeart, FaUsers, FaAward } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const About = () => {
 
  const navigate = useNavigate();
  return (
    <div className="page-container about-container">
      <div className="about">
        <h1>Our Mission</h1>
        <p className="mission-statement">
          We believe every pet deserves a loving home. Our mission is to connect 
          homeless animals with caring families, providing a seamless, supportive, 
          and joyful adoption experience for everyone involved.
        </p>
      </div>
      <div className="about-values">
        <h2>What We Stand For</h2>
        <div className="values-grid">
          <div className="value-card">
            <FaHeart className="value-icon" />
            <h3>Compassion</h3>
            <p>Every animal is treated with kindness, respect, and professional care from the moment they arrive.</p>
          </div>
          <div className="value-card">
            <FaUsers className="value-icon" />
            <h3>Community</h3>
            <p>We work with local volunteers and partners to build a network of support for new adopters and their pets.</p>
          </div>
          <div className="value-card">
            <FaAward className="value-icon" />
            <h3>Commitment</h3>
            <p>Our commitment doesn't end at adoption. We provide resources to help you and your new pet thrive.</p>
          </div>
        </div>
      </div>
      <div className="about-cta">
        <h2>Get Involved</h2>
        <p>You can make a difference. Whether you're ready to adopt, foster, or volunteer, we'd love to have you.</p>
        <div className="cta-buttons">
          <button className="cta-button" onClick={() => navigate('/adopt')}>
            See Our Pets
          </button>
          <button className="cta-button secondary-button" onClick={() => navigate('/contact')}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;