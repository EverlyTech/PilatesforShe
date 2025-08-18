import React from "react";
import logo3 from "../assets/image3.PNG";

const CommitmentSection = () => {
  return (
    <section className="commitment-section">
      <div className="container">
        <div className="section-content">
          <div className="text-content">
            <h2>Our Core Pillars</h2>
            <p>
              The 4S’s that shape every experience at Pilates for She™ <br></br>
              We don’t just teach movement. We hold space for transformation.
              Every class, every cue and every corner of our studio is grounded
              in these four pillars: <br></br>
              Safety – She feels supported - physically and emotionally. No
              pressure. No performance. Just a space where she can move with
              confidence and ease. <br></br>
              Sanctuary – This is her space. Intentional. Centered. She belongs
              here. <br></br>
              Strength – She builds power from within. At her pace. On her
              terms. This is a movement that meets her where she is. <br></br>
              Sisterhood – She’s never alone here. She’s supported, seen and
              uplifted. We rise together in this community. <br></br>
            </p>
            <a
              href="/book-now"
              className="cta-button"
              style={{ color: "white", background: "gray" }}
            >
              Meet Our Team
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
