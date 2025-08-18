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
              <h2>The SheForm™ Method</h2>
              <p>
                Our signature approach to empowered movement<br></br>
                SheForm is our proprietary Pilates method – designed
                specifically for the everyday Indian woman. Blending the science
                of functional movement with the soul of intentional practice,
                it’s more than a workout. It’s a journey inward. A path to
                strength, healing and self-discovery. Each level reflects a
                stage in her transformation, meeting her exactly where she is:{" "}
                <br></br>
                SheStart 1.0 - Foundation <br></br>
                SheBuild 1.5 - Progression <br></br>
                SheRise 2.0 - Intermediate <br></br>
                ShePower 2.5 - Advanced<br></br>
              </p>
              <a
                href="/register"
                className="cta-button"
                style={{ color: "white", background: "gray" }}
              >
                Explore Our Offerings
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
