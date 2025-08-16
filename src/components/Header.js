// src/components/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// Import your logo image (update the path if your assets folder is located differently)
// import logo5 from "../assets/logo5.PNG";
import logo from "../assets/Pilates-For-She-Logo-Final.svg";

const Header = () => {
  const [showOthers, setShowOthers] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOthers(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // Closes both menus
  const closeMenus = () => {
    setShowOthers(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo */}
        <div className="brand">
          <Link to="/" onClick={closeMenus}>
            <img
              src={logo}
              alt="Pilates for She Logo"
              style={{
                display: "block",
                maxWidth: "200px", // make it a bit bigger
                height: "auto",
                margin: "0 auto",
                padding: "10px",
                objectFit: "contain",
                backgroundColor: "white",
              }}
            />
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        {/* Navigation */}
        <nav className={`main-nav ${mobileMenuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li>
              <Link to="/" onClick={closeMenus}>
                HOME
              </Link>
            </li>
            <li>
              <Link to="/services" onClick={closeMenus}>
                SERVICES
              </Link>
            </li>
            <li>
              <Link to="/schedule" onClick={closeMenus}>
                SCHEDULE
              </Link>
            </li>
            <li className="others-menu" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowOthers(!showOthers)}
                className="others-toggle"
              >
                OTHERS ▾
              </button>
              {showOthers && (
                <ul className="others-dropdown">
                  <li>
                    <Link to="/pricing" onClick={closeMenus}>
                      PRICING
                    </Link>
                  </li>
                  <li>
                    <Link to="/our-story" onClick={closeMenus}>
                      OUR STORY
                    </Link>
                  </li>
                  <li>
                    <Link to="/club-solace" onClick={closeMenus}>
                      CLUB SOLACE
                    </Link>
                  </li>
                  <li>
                    <Link to="/get-in-touch" onClick={closeMenus}>
                      GET IN TOUCH
                    </Link>
                  </li>
                  <li>
                    <Link to="/events" onClick={closeMenus}>
                      EVENTS
                    </Link>
                  </li>
                  <li>
                    <Link to="/standards" onClick={closeMenus}>
                      STANDARDS
                    </Link>
                  </li>
                  <li>
                    <Link to="/purchase-agreement" onClick={closeMenus}>
                      PURCHASE AGREEMENT
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

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
