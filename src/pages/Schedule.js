import React from 'react';

const Schedule = () => {
  const scheduleData = [
    {
      day: 'Monday',
      classes: [
        { time: '6:00 AM', type: 'Lagree Fitness', instructor: 'Sarah' },
        { time: '8:00 AM', type: 'Mindful Movement', instructor: 'Mike' },
        { time: '10:00 AM', type: 'Lagree Fitness', instructor: 'Emma' },
        { time: '4:00 PM', type: 'Recovery Flow', instructor: 'David' },
        { time: '6:00 PM', type: 'Lagree Fitness', instructor: 'Sarah' }
      ]
    },
    {
      day: 'Tuesday',
      classes: [
        { time: '6:00 AM', type: 'Lagree Fitness', instructor: 'Mike' },
        { time: '8:00 AM', type: 'Mindful Movement', instructor: 'Emma' },
        { time: '10:00 AM', type: 'Lagree Fitness', instructor: 'David' },
        { time: '4:00 PM', type: 'Recovery Flow', instructor: 'Sarah' },
        { time: '6:00 PM', type: 'Lagree Fitness', instructor: 'Mike' }
      ]
    },
    {
      day: 'Wednesday',
      classes: [
        { time: '6:00 AM', type: 'Lagree Fitness', instructor: 'Emma' },
        { time: '8:00 AM', type: 'Mindful Movement', instructor: 'David' },
        { time: '10:00 AM', type: 'Lagree Fitness', instructor: 'Sarah' },
        { time: '4:00 PM', type: 'Recovery Flow', instructor: 'Mike' },
        { time: '6:00 PM', type: 'Lagree Fitness', instructor: 'Emma' }
      ]
    },
    {
      day: 'Thursday',
      classes: [
        { time: '6:00 AM', type: 'Lagree Fitness', instructor: 'David' },
        { time: '8:00 AM', type: 'Mindful Movement', instructor: 'Sarah' },
        { time: '10:00 AM', type: 'Lagree Fitness', instructor: 'Mike' },
        { time: '4:00 PM', type: 'Recovery Flow', instructor: 'Emma' },
        { time: '6:00 PM', type: 'Lagree Fitness', instructor: 'David' }
      ]
    },
    {
      day: 'Friday',
      classes: [
        { time: '6:00 AM', type: 'Lagree Fitness', instructor: 'Sarah' },
        { time: '8:00 AM', type: 'Mindful Movement', instructor: 'Mike' },
        { time: '10:00 AM', type: 'Lagree Fitness', instructor: 'Emma' },
        { time: '4:00 PM', type: 'Recovery Flow', instructor: 'David' },
        { time: '6:00 PM', type: 'Lagree Fitness', instructor: 'Sarah' }
      ]
    },
    {
      day: 'Saturday',
      classes: [
        { time: '8:00 AM', type: 'Lagree Fitness', instructor: 'Mike' },
        { time: '10:00 AM', type: 'Mindful Movement', instructor: 'Emma' },
        { time: '12:00 PM', type: 'Recovery Flow', instructor: 'David' }
      ]
    },
    {
      day: 'Sunday',
      classes: [
        { time: '8:00 AM', type: 'Mindful Movement', instructor: 'Sarah' },
        { time: '10:00 AM', type: 'Lagree Fitness', instructor: 'Mike' },
        { time: '12:00 PM', type: 'Recovery Flow', instructor: 'Emma' }
      ]
    }
  ];

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>Class Schedule</h1>
          <p>Join us for transformative workouts and mindful movement</p>
        </div>
      </section>

      <section className="schedule-section">
        <div className="container">
          <div className="schedule-grid">
            {scheduleData.map((day, index) => (
              <div key={index} className="day-card">
                <h3>{day.day}</h3>
                <div className="classes-list">
                  {day.classes.map((classItem, classIndex) => (
                    <div key={classIndex} className="class-item">
                      <div className="class-time">{classItem.time}</div>
                      <div className="class-details">
                        <div className="class-type">{classItem.type}</div>
                        <div className="class-instructor">with {classItem.instructor}</div>
                      </div>
                      <button className="book-btn">Book</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="booking-info">
        <div className="container">
          <h2>Booking Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <h4>Class Duration</h4>
              <p>45-60 minutes per session</p>
            </div>
            <div className="info-item">
              <h4>Class Size</h4>
              <p>Limited to 12 participants for personalized attention</p>
            </div>
            <div className="info-item">
              <h4>What to Bring</h4>
              <p>Comfortable workout attire, water bottle, and an open mind</p>
            </div>
            <div className="info-item">
              <h4>Arrival Time</h4>
              <p>Please arrive 10 minutes before class starts</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Schedule; 