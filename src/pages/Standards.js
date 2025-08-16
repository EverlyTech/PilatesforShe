import React from 'react';

const Standards = () => {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>Studio Standards</h1>
          <p>Our commitment to excellence and community guidelines</p>
        </div>
      </section>

      <section className="standards-section">
        <div className="container">
          <div className="standards-grid">
            <div className="standard-card">
              <h3>Safety & Cleanliness</h3>
              <ul>
                <li>All equipment is sanitized between classes</li>
                <li>Hand sanitizer and cleaning supplies available</li>
                <li>Proper ventilation and air circulation</li>
                <li>Regular deep cleaning of studio spaces</li>
                <li>Health screening protocols in place</li>
              </ul>
            </div>

            <div className="standard-card">
              <h3>Class Etiquette</h3>
              <ul>
                <li>Arrive 10 minutes before class starts</li>
                <li>Silence phones and remove shoes</li>
                <li>Follow instructor guidance and modifications</li>
                <li>Respect personal space and equipment</li>
                <li>Clean up your space after class</li>
              </ul>
            </div>

            <div className="standard-card">
              <h3>Instructor Standards</h3>
              <ul>
                <li>All instructors are certified in Lagree fitness</li>
                <li>Ongoing education and training required</li>
                <li>CPR and first aid certified</li>
                <li>Clear communication and demonstration</li>
                <li>Personalized attention and modifications</li>
              </ul>
            </div>

            <div className="standard-card">
              <h3>Equipment Maintenance</h3>
              <ul>
                <li>Regular inspection of all equipment</li>
                <li>Professional maintenance schedule</li>
                <li>Immediate repair of any issues</li>
                <li>Backup equipment available</li>
                <li>Safety checks before each class</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="community-guidelines">
        <div className="container">
          <h2>Community Guidelines</h2>
          <div className="guidelines-content">
            <div className="guideline-item">
              <h4>Respect & Inclusivity</h4>
              <p>We welcome individuals of all fitness levels, backgrounds, and abilities. Our studio is a judgment-free zone where everyone is encouraged to be their authentic selves.</p>
            </div>
            <div className="guideline-item">
              <h4>Mindful Communication</h4>
              <p>We encourage open, respectful communication. If you have concerns or feedback, please reach out to our team directly.</p>
            </div>
            <div className="guideline-item">
              <h4>Personal Responsibility</h4>
              <p>Each member is responsible for their own safety and well-being. Listen to your body and communicate any concerns to instructors.</p>
            </div>
            <div className="guideline-item">
              <h4>Supportive Environment</h4>
              <p>We foster a supportive community where members encourage and uplift each other. Celebrate your own progress and that of others.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="quality-assurance">
        <div className="container">
          <h2>Quality Assurance</h2>
          <div className="quality-grid">
            <div className="quality-item">
              <div className="quality-icon">✅</div>
              <h4>Certified Instructors</h4>
              <p>All our instructors hold current Lagree fitness certifications and undergo regular training.</p>
            </div>
            <div className="quality-item">
              <div className="quality-icon">✅</div>
              <h4>Equipment Standards</h4>
              <p>We use only the highest quality Lagree Mega Pro equipment, regularly maintained and inspected.</p>
            </div>
            <div className="quality-item">
              <div className="quality-icon">✅</div>
              <h4>Class Sizes</h4>
              <p>Limited class sizes ensure personalized attention and proper form guidance for every participant.</p>
            </div>
            <div className="quality-item">
              <div className="quality-icon">✅</div>
              <h4>Clean Environment</h4>
              <p>Our studio maintains the highest standards of cleanliness and hygiene for your safety and comfort.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="feedback-section">
        <div className="container">
          <h2>We Value Your Feedback</h2>
          <p>Your experience matters to us. We regularly review and update our standards based on member feedback and industry best practices.</p>
          <div className="feedback-options">
            <a href="/get-in-touch" className="feedback-btn">Share Feedback</a>
            <a href="/get-in-touch" className="feedback-btn secondary">Report an Issue</a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Standards; 