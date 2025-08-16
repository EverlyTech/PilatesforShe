import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
    alert('Login functionality would be implemented here.');
  };

  return (
    <main>
      <section className="login-section">
        <div className="container">
          <div className="login-container">
            <div className="login-header">
              <h1>Member Login</h1>
              <p>Access your account to book classes and manage your membership</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" name="remember" />
                  <span>Remember me</span>
                </label>
                <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
              </div>

              <button type="submit" className="login-btn">Sign In</button>
            </form>

            <div className="login-footer">
              <p>Don't have an account? <a href="/signup">Sign up here</a></p>
              <p>Need help? <a href="/get-in-touch">Contact us</a></p>
            </div>
          </div>

          <div className="member-benefits">
            <h3>Member Benefits</h3>
            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">📅</div>
                <div>
                  <h4>Easy Booking</h4>
                  <p>Book classes online with just a few clicks</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">📊</div>
                <div>
                  <h4>Progress Tracking</h4>
                  <p>Monitor your fitness journey and achievements</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">💳</div>
                <div>
                  <h4>Payment Management</h4>
                  <p>Update payment methods and view billing history</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">👥</div>
                <div>
                  <h4>Community Access</h4>
                  <p>Connect with other members and stay updated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="help-section">
        <div className="container">
          <h2>Need Help?</h2>
          <div className="help-options">
            <div className="help-item">
              <h4>Forgot Password?</h4>
              <p>Reset your password using your email address</p>
              <a href="/forgot-password" className="help-link">Reset Password</a>
            </div>
            <div className="help-item">
              <h4>New Member?</h4>
              <p>Create your account to start your wellness journey</p>
              <a href="/signup" className="help-link">Create Account</a>
            </div>
            <div className="help-item">
              <h4>Technical Issues?</h4>
              <p>Contact our support team for assistance</p>
              <a href="/get-in-touch" className="help-link">Contact Support</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login; 