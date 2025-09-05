// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import logo5 from "../assets/logo5.PNG";
import logo6 from "../assets/IMG_1030.PNG";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menus on click
  const closeMenus = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Hamburger Menu Button */}
        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        <div className="flex-container">
          {/* Navigation */}
          <nav className={`main-nav ${mobileMenuOpen ? "open" : ""}`}>
            <ul className="nav-list">
              <li>
                <Link to="/" onClick={closeMenus}>
                  OUR TEAM
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={closeMenus}>
                  SERVICES
                </Link>
              </li>
              <li>
                <Link to="/schedule" onClick={closeMenus}>
                  PRICING
                </Link>
              </li>
              {/* <li>
                <Link to="/pricing" onClick={closeMenus}>
                  WELLNESS EVENTS
                </Link>
              </li> */}
              <li>
                <Link to="/our-story" onClick={closeMenus}>
                  FAQs
                </Link>
              </li>
            </ul>
          </nav>

          {/* Logo */}
          <div className="brand">
            <Link to="/" onClick={closeMenus}>
              <img
                src={logo6}
                alt="Pilates for She Logo"
                style={{
                  display: "block",
                  maxWidth: "130px",
                  height: "auto",
                  margin: "0 auto",
                  padding: "10px",
                  objectFit: "contain",
                }}
              />
            </Link>
          </div>
        </div>

        {/* Login */}
        <div className="login-btn-container">
          <Link to="/login" className="login-btn" onClick={closeMenus}>
            LOGIN
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
