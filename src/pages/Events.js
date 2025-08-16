import React from "react";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Mindful Movement Workshop",
      date: "August 15, 2025",
      time: "10:00 AM - 12:00 PM",
      description:
        "Join us for a special workshop combining Lagree fitness with mindfulness techniques. Learn how to integrate breath work and meditation into your movement practice.",
      instructor: "Sarah Johnson",
      capacity: "Limited to 15 participants",
      price: "$45",
    },
    {
      id: 2,
      title: "Recovery & Restoration Day",
      date: "September 22, 2025",
      time: "2:00 PM - 4:00 PM",
      description:
        "A dedicated afternoon focused on recovery techniques, stretching, and relaxation. Perfect for those looking to enhance their recovery routine.",
      instructor: "Emma Rodriguez",
      capacity: "Limited to 20 participants",
      price: "$35",
    },
    {
      id: 3,
      title: "New Year Wellness Reset",
      date: "January 5, 2026",
      time: "9:00 AM - 11:00 AM",
      description:
        "Start your new year with intention. This workshop combines movement, goal setting, and wellness planning for a mindful start to 2025.",
      instructor: "Mike Chen",
      capacity: "Limited to 25 participants",
      price: "$50",
    },
    {
      id: 4,
      title: "Community Wellness Gathering",
      date: "January 12, 2026",
      time: "6:00 PM - 8:00 PM",
      description:
        "Connect with fellow Club Solace members in a relaxed social setting. Light refreshments and wellness discussions included.",
      instructor: "All Instructors",
      capacity: "Open to all members",
      price: "Free for members",
    },
  ];

  const recurringEvents = [
    {
      title: "Weekly Recovery Sessions",
      schedule: "Every Sunday at 10:00 AM",
      description:
        "Guided recovery sessions focusing on stretching, meditation, and relaxation techniques.",
      instructor: "Rotating Instructors",
      price: "Included with membership",
    },
    {
      title: "Monthly Wellness Workshops",
      schedule: "First Saturday of each month",
      description:
        "Monthly workshops covering various wellness topics including nutrition, mindfulness, and movement techniques.",
      instructor: "Guest Speakers & Staff",
      price: "$25 for non-members",
    },
    {
      title: "Quarterly Community Events",
      schedule: "Seasonal gatherings",
      description:
        "Quarterly social events to connect with fellow members and build lasting friendships within our community.",
      instructor: "Community Team",
      price: "Free for members",
    },
  ];

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>Events & Workshops</h1>
          <p>Join us for special events, workshops, and community gatherings</p>
        </div>
      </section>

      <section className="upcoming-events">
        <div className="container">
          <h2>Upcoming Events</h2>
          <div className="events-grid">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-header">
                  <h3>{event.title}</h3>
                  <div className="event-meta">
                    <span className="event-date">{event.date}</span>
                    <span className="event-time">{event.time}</span>
                  </div>
                </div>
                <p className="event-description">{event.description}</p>
                <div className="event-details">
                  <div className="detail-item">
                    <strong>Instructor:</strong> {event.instructor}
                  </div>
                  <div className="detail-item">
                    <strong>Capacity:</strong> {event.capacity}
                  </div>
                  <div className="detail-item">
                    <strong>Price:</strong> {event.price}
                  </div>
                </div>
                <button className="register-btn">Register Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="recurring-events">
        <div className="container">
          <h2>Recurring Events</h2>
          <div className="recurring-grid">
            {recurringEvents.map((event, index) => (
              <div key={index} className="recurring-card">
                <h3>{event.title}</h3>
                <div className="schedule">{event.schedule}</div>
                <p>{event.description}</p>
                <div className="event-info">
                  <div>
                    <strong>Instructor:</strong> {event.instructor}
                  </div>
                  <div>
                    <strong>Price:</strong> {event.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="event-gallery">
        <div className="container">
          <h2>Past Events</h2>
          <div className="gallery-grid">
            <div className="gallery-item">
              <div className="image-placeholder">Event Photo 1</div>
              <h4>Fall Wellness Retreat</h4>
              <p>January 2025</p>
            </div>
            <div className="gallery-item">
              <div className="image-placeholder">Event Photo 2</div>
              <h4>Summer Community Gathering</h4>
              <p>December 2024</p>
            </div>
            <div className="gallery-item">
              <div className="image-placeholder">Event Photo 3</div>
              <h4>Mindfulness Workshop</h4>
              <p>September 2024</p>
            </div>
            <div className="gallery-item">
              <div className="image-placeholder">Event Photo 4</div>
              <h4>Recovery Techniques Workshop</h4>
              <p>July 2024</p>
            </div>
          </div>
        </div>
      </section>

      <section className="event-cta">
        <div className="container">
          <h2>Stay Updated</h2>
          <p>
            Subscribe to our newsletter to receive updates about upcoming events
            and workshops.
          </p>
          <div className="newsletter-signup">
            <input type="email" placeholder="Enter your email address" />
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Events;
