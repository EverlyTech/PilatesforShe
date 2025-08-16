import React from "react";
import logo2 from "../assets/image2.PNG";

const WellnessSection = () => {
  const styles = {
    sectionContent: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "3rem",
      alignItems: "center",
      textAlign: "left",
      // Responsive override below handled by media query (see below)
    },
    image: {
      width: "100%",
      height: "auto",
      marginTop: "1rem",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: " 2rem 1rem",
    },

    // Media query in JS for simplicity (you can remove if not needed)
  };

  // A simple way to handle media queries in React inline style:
  // But best to use CSS for production

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .section-content {
              grid-template-columns: 1fr !important;
              text-align: center !important;
            }
          }
        `}
      </style>
      <section className="wellness-section">
        <div style={styles.container}>
          <div className="section-content" style={styles.sectionContent}>
            <div className="text-content">
              <h2>
                Redefining <em>Wellness</em>
              </h2>
              <p>
                Join us at <em>Pilates for She</em> and discover the power of
                intentional movement. Your transformation starts here
              </p>
              <a
                href="/register"
                className="cta-button"
                style={{ color: "white", background: "gray" }}
              >
                Join the Community
              </a>
            </div>
            <div className="image-content">
              <img src={logo2} alt="Instructor at Work" style={styles.image} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WellnessSection;
