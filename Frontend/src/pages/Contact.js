import React from 'react';
import '../style/Contact.css'; 
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="page-container contact-container">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>We'd love to hear from you. Send us a message, and we'll get back to you as soon as possible.</p>
      </div>
      <div className="contact-body">
        <div className="contact-form-wrapper">
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required />
            </div>
        
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="6" required></textarea>
            </div>

            <button  className="cta-button">
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-info">
          <h3>Our Contact Details</h3>
          <p>Feel free to reach out to us directly through any of these methods.</p>
          
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <span>Lebanon, Beirut City, 961+</span>
          </div>

          <div className="info-item">
            <FaPhone className="info-icon" />
            <span>961+03 778 192</span>
          </div>

          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <span>obaynana92@gmail.com</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;

