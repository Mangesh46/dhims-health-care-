import React from "react";
import "../App.css";
import DHIMSLogo from '../DHIMS.png'; // Ensure the path to your image file is correct

const About = () => {
  const aboutStyle = {
    color: "white", // Set text color to white
  };

  return (
    <div className="about-container" style={aboutStyle}>
      <div className="logo" onClick={() => window.location.href = "/"}>
      <img 
  src={DHIMSLogo} 
  className="logo-image" 
  alt="DHIMS Logo" 
  style={{ width: "200px", height: "200px" }} 
/>

      </div>
      <div className="about">
      <h2>About Us</h2>
      <p>
        Welcome to our Healthcare Management System - your all-in-one solution for seamless patient care and hospital management. Our mission is to simplify healthcare by leveraging the power of technology and APIs to provide reliable, secure, and user-friendly solutions.
        With features like a Nearby Hospital Locator, secure health data storage, access to medical records, and appointment scheduling, we aim to bridge the gap between healthcare providers and patients. Our platform integrates cutting-edge APIs and ensures compliance with healthcare standards to deliver a superior experience to our users.
        At the heart of our system is a commitment to innovation, security, and convenience. Whether you're a patient looking to manage your health better or a healthcare provider aiming to improve operational efficiency, we are here to support your journey.
      </p>
    </div>
    </div>
  );
};

export default About;
