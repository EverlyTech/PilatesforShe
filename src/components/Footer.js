import React from "react";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Visit Us</h3>
            <p>
              188 S Monterey St #106
              <br />
              Alhambra, CA 91801
            </p>
            <p>
              <strong>Hours</strong>
              <br />
              Monday–Sunday
              <br />
              6am - 6pm
            </p>
          </div>
          <div className="footer-map">
            <div
              className="map-placeholder"
              style={{ width: "100%", height: "200px" }}
            >
              <iframe
                title="US Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193571.43865208624!2d-74.11808667296062!3d40.7058254414661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2508e5592f5e3%3A0x19ae1d98a6c91c9f!2sNew%20York%2C%20NY%2010001%2C%20USA!5e0!3m2!1sen!2sin!4v1691512977534!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Made by Pilates. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
