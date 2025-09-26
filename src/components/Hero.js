// src/components/Hero.js
import React from "react";
import { Link } from "react-router-dom";
import BgImage from "../assets/BgImage.PNG"; // Import existing background image

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Background Image */}
      <div 
        className="hero-video"
        style={{
          backgroundImage: `url(${BgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Dark overlay */}
      <div className="hero-overlay"></div>

      {/* Text Content */}
      <div className="hero-content container" style={{ padding: "0 20px" }}>
        <h1 style={{ color: "#FCF9EE", fontWeight: "500" }}>
          EMPOWER HER CORE
        </h1>
        <p>
          Rooted in the science and soul of intentional movement, Pilates for
          She™ is more than a studio – it’s a sanctuary for the everyday Indian
          woman. Designed to help her reconnect with her body and reclaim her
          strength, we offer mindful mat and reformer Pilates experiences that
          empower her from within. Every class is an invitation for her to slow
          down, tune in and come home to her body – through movement that heals
          and strength that lasts.
        </p>
        <Link to="/login" className="cta-button">
          Join the Circle
        </Link>
      </div>
    </section>
  );
};

export default Hero;
