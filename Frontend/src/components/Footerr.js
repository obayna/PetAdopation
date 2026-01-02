import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Footer.css'; 
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-about">
          <h2 className="footer-logo">PetAdopt</h2>
          <p>
            Our mission is to connect loving homes with animals in need.
            Find your new best friend and change a life forever.
          </p>
        </div>
        <div className="footer-section footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/adopt">Adopt a Pet</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section footer-involved">
          <h3>Get Involved</h3>
          <ul>
            <li><Link to="/volunteer">Volunteer</Link></li>
            <li><Link to="/donate">Donate</Link></li>
            <li><Link to="/faq">Adoption FAQ</Link></li>
          </ul>
        </div>
        <div className="footer-section footer-social">
          <h3>Follow Us</h3>
          <p>Stay up to date with our latest arrivals!</p>
          <div className="social-icons">
           <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
              <FaPinterestP />
            </a>
          </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PetAdopt. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;