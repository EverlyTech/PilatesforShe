import React from 'react';

const Pricing = () => {
  const pricingPlans = [
    {
      name: '4 Classes per Month',
      price: '$118',
      perClass: '$29.50 per class',
      description: 'Perfect for those beginning their wellness journey',
      features: [
        '4 Lagree Fitness classes',
        '2 free Red Light Therapy sessions',
        'Bring a friend to red light therapy'
      ],
      popular: false
    },
    {
      name: '8 Classes per Month',
      price: '$198',
      perClass: '$24.75 per class',
      description: 'Most popular choice',
      features: [
        '8 Lagree Fitness classes',
        '3 free Red Light Therapy sessions',
        'Bring a friend to red light therapy',
        '5% discount on all retail purchases'
      ],
      popular: true
    },
    {
      name: '12 Classes per Month',
      price: '$258',
      perClass: '$21.50 per class',
      description: 'Best value for committed members',
      features: [
        '12 Lagree Fitness classes',
        '4 free Red Light Therapy sessions',
        'Bring a friend to red light therapy',
        '10% discount on retail and merchandise'
      ],
      popular: false
    }
  ];

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>Pricing & Memberships</h1>
          <p>Choose the plan that fits your wellness journey</p>
        </div>
      </section>

      <section className="pricing-section">
        <div className="container">
          <div className="commitment-notice">
            <p><strong>All memberships require a 3-month minimum commitment.</strong></p>
          </div>
          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <h3>{plan.name}</h3>
                <div className="price">{plan.price}/month</div>
                <p className="price-per-class">{plan.perClass}</p>
                <p className="description">{plan.description}</p>
                <ul className="features-list">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
                <button className="join-btn">JOIN NOW</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="recovery-pricing">
        <div className="container">
          <h2>Rest & Recovery Services</h2>
          <div className="recovery-pricing-content">
            <div className="recovery-option">
              <h3>Red Light Therapy (20 min)</h3>
              <div className="price">$25/session</div>
            </div>
            
            <div className="package-options">
              <h3>Package Options:</h3>
              <ul className="package-list">
                <li>✓ 5 Sessions – $108 (6-month expiration)</li>
                <li>✓ 10 Sessions – $198 (12-month expiration)</li>
                <li>✓ 20 Sessions – $358 (12-month expiration)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="membership-benefits">
        <div className="container">
          <h2>All Memberships Include</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🏋️</div>
              <h4>Mega Pro Equipment</h4>
              <p>Access to state-of-the-art Lagree fitness equipment</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">👨‍🏫</div>
              <h4>Expert Instructors</h4>
              <p>Certified Lagree instructors guiding every session</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🧘</div>
              <h4>Mindful Environment</h4>
              <p>Peaceful studio designed for focus and recovery</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">👥</div>
              <h4>Community Support</h4>
              <p>Join a supportive community of wellness enthusiasts</p>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>What is the minimum commitment period?</h4>
              <p>All memberships require a 3-month minimum commitment to ensure you can experience the full benefits of our programs.</p>
            </div>
            <div className="faq-item">
              <h4>Can I bring a friend to red light therapy?</h4>
              <p>Yes! All membership tiers include the ability to bring a friend to red light therapy sessions.</p>
            </div>
            <div className="faq-item">
              <h4>What should I wear to class?</h4>
              <p>Comfortable, form-fitting workout attire that allows for full range of motion. We recommend leggings or shorts and a fitted top.</p>
            </div>
            <div className="faq-item">
              <h4>Do I need to bring my own equipment?</h4>
              <p>No, all equipment is provided. Just bring yourself, comfortable clothes, and a water bottle.</p>
            </div>
            <div className="faq-item">
              <h4>Can I cancel or reschedule my class?</h4>
              <p>Yes, you can cancel or reschedule up to 12 hours before your scheduled class time.</p>
            </div>
            <div className="faq-item">
              <h4>Is Lagree suitable for beginners?</h4>
              <p>Absolutely! Our instructors modify exercises for all fitness levels, from complete beginners to advanced practitioners.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Pricing; 