import React from 'react';

const OurStory = () => {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>Our Story</h1>
          <p>The journey that brought us to create a sanctuary for mindful living</p>
        </div>
      </section>

      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>The Beginning</h2>
              <p>
                Made by Solace was born from a simple yet profound realization: in our fast-paced world, 
                we all need a place to slow down, reconnect, and find our center. What started as a 
                personal quest for balance became a mission to create a sanctuary where others could 
                experience the transformative power of mindful movement.
              </p>
              <p>
                Our founder discovered Lagree fitness during a particularly challenging time in life, 
                seeking not just physical strength, but mental clarity and emotional resilience. The 
                combination of high-intensity, low-impact movement with an emphasis on mindfulness 
                created exactly what was needed—a practice that strengthened both body and soul.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">Studio Image</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-image">
              <div className="image-placeholder">Mission Image</div>
            </div>
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                We are more than a studio—we are a movement toward mindful living. Our philosophy 
                is rooted in the belief that wellness should feel effortless yet profound. Through 
                expert-led Lagree fitness and emphasis on rest and recovery, we curate experiences 
                that restore, elevate, and transform.
              </p>
              <p>
                Every class is an invitation to slow down, tune in, and find your solace through 
                intentional movement. Whether you're stepping onto the Mega Pro for the first time 
                or deepening your wellness journey, our space invites you to Feed Your Soul and 
                Find Your Solace.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">🧘</div>
              <h3>Mindfulness</h3>
              <p>We believe in the power of present-moment awareness and intentional movement.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>We foster a supportive environment where everyone feels welcome and valued.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">💪</div>
              <h3>Excellence</h3>
              <p>We maintain the highest standards in instruction, equipment, and service.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">❤️</div>
              <h3>Authenticity</h3>
              <p>We stay true to our mission and values in everything we do.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <div className="image-placeholder">Sarah</div>
              </div>
              <h3>Sarah Johnson</h3>
              <p className="member-title">Founder & Lead Instructor</p>
              <p>Certified Lagree instructor with over 8 years of experience in mindful movement and wellness coaching.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <div className="image-placeholder">Mike</div>
              </div>
              <h3>Mike Chen</h3>
              <p className="member-title">Senior Instructor</p>
              <p>Specializes in strength training and recovery, helping clients build sustainable fitness habits.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <div className="image-placeholder">Emma</div>
              </div>
              <h3>Emma Rodriguez</h3>
              <p className="member-title">Wellness Coach</p>
              <p>Focuses on holistic wellness, combining movement with mindfulness and nutrition guidance.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OurStory; 