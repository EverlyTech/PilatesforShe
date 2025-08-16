import React from "react";
import logo3 from "../assets/image3.PNG";

const CommitmentSection = () => {
  return (
    <section className="commitment-section">
      <div className="container">
        <div className="section-content">
          <div className="text-content">
            <h2>Our Commitment.</h2>
            <p>
              We are more than a studio, we are a movement toward mindful
              living. Grounded in authenticity and excellence, we guide our
              community toward holistic well-being, ensuring every experience is
              infused with care, expertise, and a sense of belonging.
            </p>
            <a
              href="/book-now"
              className="cta-button"
              style={{ color: "white", background: "gray" }}
            >
              Start Your Journey with Solace
            </a>
          </div>
          <div className="image-content">
            <img src={logo3} alt="Community and Movement" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommitmentSection;
