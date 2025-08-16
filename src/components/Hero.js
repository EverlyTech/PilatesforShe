// src/components/Hero.js
import React from "react";
import { Link } from "react-router-dom";
import PilatesVideo from "../assets/Pilates.mp4"; // Import your local video

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Background Video */}
      <video
        src={PilatesVideo}
        autoPlay
        muted
        loop
        playsInline
        className="hero-video"
      />

      {/* Dark overlay */}
      <div className="hero-overlay"></div>

      {/* Text Content */}
      <div className="hero-content container" style={{ padding: "0 20px" }}>
        <h1>
          Find Your <em>Pilates</em>
        </h1>
        <p>
          Rooted in the transformative power of mindful movement, our Lagree
          studio is more than a place to work out — it's a sanctuary for the
          mind, body, and soul. Designed to help you reconnect and recharge, we
          offer high-intensity, low-impact workouts that sculpt, strengthen, and
          sustain your well-being. Every class is an invitation to slow down,
          tune in, and find your solace through intentional movement and
          recovery.
        </p>
        <Link to="/login" className="cta-button">
          JOIN NOW
        </Link>
      </div>
    </section>
  );
};

export default Hero;
