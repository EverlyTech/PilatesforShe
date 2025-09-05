import React from "react";
import glowImage from "../assets/glow-hq.PNG";

const Services = () => {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Discover the transformative power of mindful movement</p>
        </div>
      </section>

      <section className="services-intro">
        <div className="container">
          <div className="services-content">
            <div className="services-text">
              <h2>Our Services</h2>
              <p>
                At Made by Solace, we offer thoughtfully curated memberships and
                packages designed to help you move, recover, and thrive. Whether
                you're looking to try your first class, commit to a structured
                routine, or enhance your recovery, we have options for every
                stage of your wellness journey.
              </p>
              <a href="/schedule" className="cta-button1">
                BOOK YOUR FIRST CLASS
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="membership-services">
        <div className="container">
          <h2>Membership Options</h2>
          <div className="membership-grid">
            <div className="membership-card">
              <h3>4 Classes per Month</h3>
              <div className="price">$118/month</div>
              <p className="price-per-class">$29.50 per class</p>
              <ul className="benefits-list">
                <li>✓ 4 Lagree Fitness classes</li>
                <li>✓ 2 free Red Light Therapy sessions</li>
                <li>✓ Bring a friend to red light therapy</li>
              </ul>
              <button className="join-btn">JOIN NOW</button>
            </div>

            <div className="membership-card featured">
              <div className="featured-badge">Most Popular</div>
              <h3>8 Classes per Month</h3>
              <div className="price">$198/month</div>
              <p className="price-per-class">$24.75 per class</p>
              <ul className="benefits-list">
                <li>✓ 8 Lagree Fitness classes</li>
                <li>✓ 3 free Red Light Therapy sessions</li>
                <li>✓ Bring a friend to red light therapy</li>
                <li>✓ 5% discount on all retail purchases</li>
              </ul>
              <button className="join-btn">JOIN NOW</button>
            </div>

            <div className="membership-card">
              <h3>12 Classes per Month</h3>
              <div className="price">$258/month</div>
              <p className="price-per-class">$21.50 per class</p>
              <ul className="benefits-list">
                <li>✓ 12 Lagree Fitness classes</li>
                <li>✓ 4 free Red Light Therapy sessions</li>
                <li>✓ Bring a friend to red light therapy</li>
                <li>✓ 10% discount on retail and merchandise</li>
              </ul>
              <button className="join-btn">JOIN NOW</button>
            </div>
          </div>
          <div className="commitment-notice">
            <p>
              <strong>
                All memberships require a 3-month minimum commitment.
              </strong>
            </p>
          </div>
        </div>
      </section>

      <section className="recovery-services">
        <div className="container">
          <div className="recovery-content">
            <div className="recovery-text">
              <h2>Rest & Recovery</h2>
              <p>Because movement is only one part of the equation.</p>
              <div className="recovery-option">
                <h3>Red Light Therapy (20 min)</h3>
                <p className="price">$25/session</p>
              </div>
              <div className="recovery-option">
                <h3>Rest & Recovery Room</h3>
                <p>includes meditation amenities</p>
              </div>

              <h3>Packages Available:</h3>
              <ul className="package-list">
                <li>✓ 5 Sessions – $108 (6-month expiration)</li>
                <li>✓ 10 Sessions – $198 (12-month expiration)</li>
                <li>✓ 20 Sessions – $358 (12-month expiration)</li>
              </ul>

              <a href="/schedule" className="cta-button">
                BOOK A SESSION
              </a>
            </div>

            <div className="recovery-image glow-hq">
              <img
                src={glowImage}
                alt="Glow HQ"
                className="image-placeholder"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="additional-services">
        <div className="container">
          <h2>Additional Amenities</h2>
          <div className="amenities-grid">
            {/* Shampoo & Conditioner */}
            <div className="amenity-item">
              <h3>Luxury Shampoo & Conditioner</h3>
              <p>
                Pamper yourself after your workout with our salon-quality
                shampoo.
              </p>
              <div className="amenity-image">
                <img
                  src={require("../assets/IMG_1037.PNG")}
                  alt="Shampoo and Conditioner"
                />
              </div>
            </div>

            {/* Branded Tote Bags */}
            <div className="amenity-item">
              <h3>Pilates Branded Bags</h3>
              <p>
                Take home our eco-friendly Pilates tote bags, perfect for
                everyday use.
              </p>
              <div className="amenity-image">
                <img
                  src={require("../assets/IMG_1039.PNG")}
                  alt="Pilates Branded Tote Bag"
                />
              </div>
            </div>

            {/* Dumbbells & Light Weights */}
            <div className="amenity-item">
              <h3>Dumbbells & Resistance Gear</h3>
              <p>
                Enhance your workout with our range of dumbbells and resistance
                equipment.
              </p>
              <div className="amenity-image">
                <img
                  src={require("../assets/IMG_1048.PNG")}
                  alt="Dumbbells and Resistance Gear"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="location-section">
        <div className="container">
          <div className="location-info">
            <h3>Visit Our Studio</h3>
            <p>
              188 South Monterey Street
              <br />
              Alhambra, CA, 91801, United States
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
