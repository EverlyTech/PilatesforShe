import React from "react";

const PurchaseAgreement = () => {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1>Purchase Agreement</h1>
          <p>Terms and conditions for membership and services</p>
        </div>
      </section>

      <section className="agreement-section">
        <div className="container">
          <div className="agreement-content">
            <h2>Membership Terms & Conditions</h2>

            <div className="agreement-section">
              <h3>1. Membership Types</h3>
              <p>
                <strong>Single Class:</strong> Valid for one class session. No
                expiration date.
              </p>
              <p>
                <strong>5-Class Pack:</strong> Valid for 3 months from purchase
                date.
              </p>
              <p>
                <strong>Monthly Unlimited:</strong> Valid for one calendar month
                from start date.
              </p>
              <p>
                <strong>Annual Membership:</strong> Valid for 12 months from
                start date.
              </p>
            </div>

            <div className="agreement-section">
              <h3>2. Booking & Cancellation Policy</h3>
              <ul>
                <li>
                  Classes must be booked in advance through our online system
                </li>
                <li>
                  Cancellations must be made at least 12 hours before class
                  start time
                </li>
                <li>
                  Late cancellations or no-shows will result in forfeiture of
                  the class
                </li>
                <li>
                  Waitlist positions are automatically filled as cancellations
                  occur
                </li>
                <li>Arrival 10 minutes before class start is required</li>
              </ul>
            </div>

            <div className="agreement-section">
              <h3>3. Payment Terms</h3>
              <ul>
                <li>All payments are processed at the time of purchase</li>
                <li>Monthly and annual memberships are non-refundable</li>
                <li>Class packs are non-refundable but may be transferred</li>
                <li>Prices are subject to change with 30 days notice</li>
                <li>
                  Automatic renewals apply to monthly and annual memberships
                </li>
              </ul>
            </div>

            <div className="agreement-section">
              <h3>4. Studio Policies</h3>
              <ul>
                <li>Proper workout attire is required for all classes</li>
                <li>
                  Personal belongings should be stored in designated areas
                </li>
                <li>
                  Food and drinks (except water) are not permitted in the studio
                </li>
                <li>Cell phones must be silenced during class</li>
                <li>
                  Instructors reserve the right to modify or cancel classes
                </li>
              </ul>
            </div>

            <div className="agreement-section">
              <h3>5. Health & Safety</h3>
              <ul>
                <li>
                  Members must disclose any health conditions that may affect
                  participation
                </li>
                <li>
                  Studio is not responsible for personal injury during classes
                </li>
                <li>Members participate at their own risk</li>
                <li>Instructors may modify exercises for safety reasons</li>
                <li>Emergency contact information must be kept current</li>
              </ul>
            </div>

            <div className="agreement-section">
              <h3>6. Membership Freeze & Cancellation</h3>
              <ul>
                <li>
                  Monthly memberships may be frozen for up to 2 months per year
                </li>
                <li>
                  Annual memberships may be frozen for up to 3 months total
                </li>
                <li>
                  Freeze requests must be submitted in writing 30 days in
                  advance
                </li>
                <li>
                  Memberships may be cancelled with 30 days written notice
                </li>
                <li>No refunds for partial months or unused classes</li>
              </ul>
            </div>

            <div className="agreement-section">
              <h3>7. Guest Policy</h3>
              <ul>
                <li>
                  Guest passes are included with certain membership levels
                </li>
                <li>Guests must complete a waiver before participating</li>
                <li>Guest passes are non-transferable and non-refundable</li>
                <li>Additional guest passes may be purchased for $25 each</li>
                <li>Guests must follow all studio policies and procedures</li>
              </ul>
            </div>

            <div className="agreement-section">
              <h3>8. Privacy & Communication</h3>
              <ul>
                <li>Personal information is collected and stored securely</li>
                <li>Studio may contact members via email, phone, or text</li>
                <li>Members may opt out of marketing communications</li>
                <li>Photos may be taken during events with consent</li>
                <li>
                  Social media sharing is encouraged with appropriate tagging
                </li>
              </ul>
            </div>

            <div className="agreement-section">
              <h3>9. Dispute Resolution</h3>
              <p>
                Any disputes arising from this agreement will be resolved
                through mediation. If mediation is unsuccessful, disputes will
                be resolved through binding arbitration in accordance with the
                laws of California.
              </p>
            </div>

            <div className="agreement-section">
              <h3>10. Changes to Agreement</h3>
              <p>
                Made by Solace reserves the right to modify these terms and
                conditions at any time. Members will be notified of changes via
                email or in-studio notices. Continued use of services
                constitutes acceptance of modified terms.
              </p>
            </div>

            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>For questions about this agreement, please contact us:</p>
              <p>Email: legal@madebysolace.com</p>
              <p>Phone: (626) 555-0123</p>
              <p>Address: 188 S Monterey St #106, Alhambra, CA 91801</p>
            </div>

            <div className="effective-date">
              <p>
                <strong>Effective Date:</strong> January 1, 2025
              </p>
              <p>
                <strong>Last Updated:</strong> June 31, 2025
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PurchaseAgreement;
