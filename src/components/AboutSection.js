import React, { useState } from "react";
import logo from "../assets/image1.PNG";

const AboutSection = () => {
  const [readMore, setReadMore] = useState(false);

  const toggleReadMore = () => setReadMore(!readMore);

  return (
    <section className="about-section">
      <div className="container">
        <div className="section-content">
          <div className="text-content">
            <h2>Who are we?</h2>
            <p>
              <p>
                Pilates for She™ is India’s first women-centric reformer and mat
                Pilates studio – created to{" "}
                <span className="highlight">EMPOWER HER CORE</span> physically,
                emotionally and socially.
              </p>

              <p>
                In a world that’s constantly asking women to make space for
                others, we made a space just for her. A space where she can
                breathe deeply, move freely and reconnect with her body – in her
                own way, on her own terms.
                {!readMore && "..."}
              </p>

              {readMore && (
                <>
                  <p>
                    This isn’t about keeping people out. It’s about welcoming
                    women in — especially the ones who’ve never felt fully at
                    home in a traditional fitness space. We’re here for the{" "}
                    everyday woman. For the homemaker. The teacher. The
                    entrepreneur. The new mom. The woman in pain. The one who’s
                    never stepped on a reformer, but needs this space more than
                    anyone.
                  </p>

                  <p>
                    Because we believe women deserve to be centered — not just
                    included. And that’s what we’re building. And that’s why
                    it’s just for her.
                  </p>

                  <p>
                    We exist to make science-backed, soulful movement accessible
                    and inclusive – creating safe spaces where women can
                    reconnect with their bodies, their strength and their
                    stories.
                  </p>

                  <p>
                    Our vision is simple: To rewrite the story of wellness in
                    India – one woman, one class, and one core at a time. Come
                    experience the difference!
                  </p>
                </>
              )}
              <button className="read-more-btn" onClick={toggleReadMore}>
                {readMore ? "Read Less" : "Read More"}
              </button>
            </p>
            <br />
            <a href="/pricing" className="cta-button">
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
