import React, { useState } from "react";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "general",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>
            We'd love to hear from you and answer any questions you may have
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div>
                  <h4>Address</h4>
                  <p>
                    188 S Monterey St #106
                    <br />
                    Alhambra, CA 91801
                  </p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>(626) 555-0123</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">✉️</div>
                <div>
                  <h4>Email</h4>
                  <p>hello@madebysolace.com</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">🕒</div>
                <div>
                  <h4>Hours</h4>
                  <p>
                    Monday–Sunday
                    <br />
                    6am - 6pm
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="membership">Membership Questions</option>
                    <option value="schedule">Class Schedule</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <h2>Visit Us</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <p>Interactive Map</p>
              <p>188 S Monterey St #106, Alhambra, CA 91801</p>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-contact">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>How do I book my first class?</h4>
              <p>
                You can book your first class through our online scheduling
                system or by calling us directly. We recommend arriving 10
                minutes early for your first session.
              </p>
            </div>
            <div className="faq-item">
              <h4>What should I wear to my first class?</h4>
              <p>
                Wear comfortable, form-fitting workout attire that allows for
                full range of motion. We recommend leggings or shorts and a
                fitted top.
              </p>
            </div>
            <div className="faq-item">
              <h4>Do you offer trial classes?</h4>
              <p>
                Yes! We offer a single class option for $25, perfect for trying
                out our studio and experiencing Lagree fitness.
              </p>
            </div>
            <div className="faq-item">
              <h4>Can I cancel or reschedule my class?</h4>
              <p>
                Yes, you can cancel or reschedule up to 12 hours before your
                scheduled class time through our booking system.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GetInTouch;
