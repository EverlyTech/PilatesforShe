import React from 'react';

const ClubSolace = () => {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>Club Solace</h1>
          <p>Join our community of mindful movers and wellness enthusiasts</p>
        </div>
      </section>

      <section className="club-intro">
        <div className="container">
          <div className="intro-content">
            <h2>Welcome to Club Solace</h2>
            <p>
              Club Solace is more than just a membership—it's a community of like-minded individuals 
              committed to holistic wellness and mindful living. Here, you'll find not just workouts, 
              but a supportive network of people who understand the importance of taking care of your 
              mind, body, and soul.
            </p>
          </div>
        </div>
      </section>

      <section className="membership-tiers">
        <div className="container">
          <h2>Membership Tiers</h2>
          <div className="tiers-grid">
            <div className="tier-card">
              <h3>Solace Seeker</h3>
              <p className="tier-description">Perfect for those beginning their wellness journey</p>
              <ul className="tier-benefits">
                <li>Access to all Lagree classes</li>
                <li>Basic equipment access</li>
                <li>Monthly wellness newsletter</li>
                <li>Community events access</li>
              </ul>
            </div>
            <div className="tier-card featured">
              <div className="featured-badge">Most Popular</div>
              <h3>Solace Explorer</h3>
              <p className="tier-description">For committed wellness enthusiasts</p>
              <ul className="tier-benefits">
                <li>Unlimited Lagree classes</li>
                <li>Priority booking</li>
                <li>Recovery session access</li>
                <li>Monthly guest pass</li>
                <li>Exclusive workshops</li>
                <li>Personal wellness consultation</li>
              </ul>
            </div>
            <div className="tier-card">
              <h3>Solace Master</h3>
              <p className="tier-description">Ultimate wellness experience</p>
              <ul className="tier-benefits">
                <li>Everything in Explorer</li>
                <li>2 monthly guest passes</li>
                <li>Private sessions (2/month)</li>
                <li>Nutrition consultation</li>
                <li>Exclusive member events</li>
                <li>Personalized wellness plan</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="community-events">
        <div className="container">
          <h2>Community Events</h2>
          <div className="events-grid">
            <div className="event-card">
              <div className="event-date">Monthly</div>
              <h3>Wellness Workshops</h3>
              <p>Monthly workshops covering topics from nutrition to mindfulness and recovery techniques.</p>
            </div>
            <div className="event-card">
              <div className="event-date">Quarterly</div>
              <h3>Community Gatherings</h3>
              <p>Quarterly social events to connect with fellow members and build lasting friendships.</p>
            </div>
            <div className="event-card">
              <div className="event-date">Seasonal</div>
              <h3>Wellness Retreats</h3>
              <p>Seasonal retreats combining movement, mindfulness, and community in beautiful settings.</p>
            </div>
            <div className="event-card">
              <div className="event-date">Weekly</div>
              <h3>Recovery Sessions</h3>
              <p>Weekly guided recovery sessions focusing on stretching, meditation, and relaxation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="member-stories">
        <div className="container">
          <h2>Member Stories</h2>
          <div className="stories-grid">
            <div className="story-card">
              <div className="member-avatar">
                <div className="avatar-placeholder">A</div>
              </div>
              <h4>Alexandra M.</h4>
              <p>"Club Solace has transformed not just my fitness routine, but my entire approach to wellness. The community here is incredible."</p>
            </div>
            <div className="story-card">
              <div className="member-avatar">
                <div className="avatar-placeholder">J</div>
              </div>
              <h4>James L.</h4>
              <p>"I've never felt stronger or more centered. The combination of Lagree and mindfulness has been life-changing."</p>
            </div>
            <div className="story-card">
              <div className="member-avatar">
                <div className="avatar-placeholder">M</div>
              </div>
              <h4>Maria S.</h4>
              <p>"The instructors are amazing and the community is so supportive. I've found my second home here."</p>
            </div>
          </div>
        </div>
      </section>

      <section className="join-cta">
        <div className="container">
          <h2>Ready to Join Club Solace?</h2>
          <p>Start your journey toward mindful living and become part of our supportive community.</p>
          <div className="cta-buttons">
            <a href="/pricing" className="cta-button">View Membership Options</a>
            <a href="/schedule" className="cta-button secondary">Book a Class</a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ClubSolace; 