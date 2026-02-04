import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <div className="footer-section">
          <h3>MobileBuyer.in</h3>
          <p>India's most trusted platform for buying and selling certified refurbished second-hand phones with professional quality assurance and warranty coverage.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/" aria-label="Home page">Home</a></li>
            <li><a href="/about" aria-label="About us page">About Us</a></li>
            <li><a href="/services" aria-label="Our services">Our Services</a></li>
            <li><a href="/contact" aria-label="Contact us">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Our Services</h4>
          <ul>
            <li>Sell Your Old Phone</li>
            <li>Buy Refurbished Phones</li>
            <li>Phone Refurbishment</li>
            <li>Warranty & Support</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>📞 +91 12345 67890</p>
          <p>📧 support@mobilebuyer.in</p>
          <p>🏢 Delhi, Mumbai, Bangalore & more</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 MobileBuyer.in. All rights reserved. | Second Hand Phones | Refurbished Smartphones</p>
      </div>
    </footer>
  );
};

export default Footer;