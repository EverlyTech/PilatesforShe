import React from "react";
import logo from "../assets/image1.PNG";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="section-content">
          <div className="text-content">
            <h2>
              A Sanctuary for Mindful <em>Living</em>
            </h2>
            <p>
              Our philosophy is rooted in the belief that wellness should be
              both gentle and transformative. Through expert-led Pilates
              sessions and a focus on mindful movement and breath, we create
              experiences that strengthen, restore, and elevate your body and
              mind. Whether you're new to Pilates or advancing your practice,
              our studio welcomes you to Nourish Your Body and Embrace Your
              Balance.
            </p>
            <a
              href="/pricing"
              className="cta-button"
              style={{
                backgroundColor: "#76797cff", // blue color
                color: "white",
              }}
            >
              Explore Our Offerings
            </a>
          </div>
          <div className="image-content">
            <img src={logo} alt="Studio Entrance" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
