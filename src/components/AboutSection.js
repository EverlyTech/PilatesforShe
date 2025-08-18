import React from "react";
import logo from "../assets/image1.PNG";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="section-content">
          <div className="text-content">
            <h2>Who are we?</h2>
            <p>
              Pilates for She™ is India’s first women-centric reformer and mat
              Pilates studio – created to EMPOWER HER CORE physically,
              emotionally and socially.<br></br>
              In a world that’s constantly asking women to make space for
              others, we made a space just for her. A space where she can
              breathe deeply, move freely and reconnect with her body – in her
              own way, on her own terms.<br></br>
              This isn’t about keeping people out. It’s about welcoming women in
              — especially the ones who’ve never felt fully at home in a
              traditional fitness space. We’re here for the everyday woman. For
              the homemaker. The teacher. The entrepreneur. The new mom. The
              woman in pain. The one who’s never stepped on a reformer, but
              needs this space more than anyone.<br></br>
              Because we believe women deserve to be centered — not just
              included. And that’s what we’re building. And that’s why it’s just
              for her. <br></br>
              We exist to make science-backed, soulful movement accessible and
              inclusive – creating safe spaces where women can reconnect with
              their bodies, their strength and their stories.<br></br>
              Our vision is simple: <br></br>
              To rewrite the story of wellness in India – one woman, one class,
              and one core at a time. <br></br>
              Come experience the difference!
            </p>
            <a
              href="/pricing"
              className="cta-button"
              style={{
                backgroundColor: "#76797cff", // blue color
                color: "white",
              }}
            >
              First Class Free
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
