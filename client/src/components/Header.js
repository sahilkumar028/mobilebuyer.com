import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header" role="banner">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="nav-brand">
          <Link to="/" className="brand-link" aria-label="MobileBuyer.in Home">
            <h1>MobileBuyer.in</h1>
          </Link>
        </div>
        <ul className="nav-menu" role="menubar">
          <li role="none">
            <Link to="/" className="nav-link" role="menuitem">
              Home
            </Link>
          </li>
          <li role="none">
            <Link to="/sell-phone" className="nav-link sell-phone-link" role="menuitem">
              Sell Phone
            </Link>
          </li>
          <li role="none">
            <Link to="/about" className="nav-link" role="menuitem">
              About Us
            </Link>
          </li>
          <li role="none">
            <Link to="/services" className="nav-link" role="menuitem">
              Our Services
            </Link>
          </li>
          <li role="none">
            <Link to="/contact" className="nav-link" role="menuitem">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;