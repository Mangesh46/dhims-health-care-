import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";



import DHIMSLogo from './DHIMS.png';


const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="navbar">
        <div className="logo">
          {/* Replace the text with an image */}
          
            { /*<img src="/DHIMS.png" className="logo-image" alt="DHIMS Logo" /> */}
            <img src={DHIMSLogo} className="logo-image" alt="DHIMS Logo" />
         
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/hospital-locator">Hospital Locator</Link></li>
            <li><Link to="/appointment">Appointment</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/hospital-registration">Hospital Registration</Link></li>
            <li><Link to="/doctor">Doctor</Link></li>
            <li><Link to="/know-your-health">Know Your Health</Link></li>
          </ul>
        </nav>
        <Link to="/appointment" className="btn-appointment">Book an Appointment</Link>
      </header>

      <section className="hero-section" >
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Welcome to DHIMS</h1>
              <p>Your trusted digital health management system.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-info">
          <p>DHIMS</p>
          <p>© 2024 – present</p>
          <p><Link to="/privacy">Privacy</Link> – <Link to="/terms">Terms</Link></p>
        </div>
        <div className="social-links">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
