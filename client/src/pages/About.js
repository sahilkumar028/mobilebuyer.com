import React from 'react';
import SEOHead from '../components/SEOHead';

const About = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About MobileBuyer.in - India's Trusted Refurbished Phone Experts",
    "description": "Learn about MobileBuyer.in's mission to provide quality refurbished second-hand phones with professional service and warranty",
    "url": "https://mobilebuyer.in/about"
  };

  return (
    <>
      <SEOHead
        title="About MobileBuyer.in - India's Trusted Second Hand Phone Refurbishment Experts"
        description="Learn about MobileBuyer.in's mission to provide quality refurbished second-hand phones, our professional refurbishment process, and commitment to customer satisfaction"
        keywords="about mobile buyer, refurbished phone experts, second hand phone company, mobile refurbishment india, pre-owned smartphone specialists"
        canonical="https://mobilebuyer.in/about"
        structuredData={structuredData}
      />
      
      <section className="about-hero" aria-labelledby="about-heading">
        <div className="container">
          <h1 id="about-heading">About MobileBuyer.in</h1>
          <p className="lead">
            India's most trusted platform for buying and selling certified refurbished 
            second-hand phones with professional quality assurance and warranty.
          </p>
        </div>
      </section>

      <section className="mission-section">
        <div className="container">
          <h2>Our Mission & Vision</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <h3>🎯 Our Mission</h3>
              <p>
                To make premium smartphones accessible to everyone through professional 
                refurbishment of second-hand phones while promoting sustainable technology 
                consumption and reducing electronic waste.
              </p>
            </div>
            <div className="mission-card">
              <h3>👁️ Our Vision</h3>
              <p>
                To become India's leading marketplace for certified refurbished phones, 
                setting industry standards for quality, transparency, and customer 
                satisfaction in the pre-owned smartphone market.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="container">
          <h2>The MobileBuyer.in Story</h2>
          <div className="story-content">
            <p>
              Founded with a vision to bridge the gap between affordability and quality in 
              the smartphone market, <strong>MobileBuyer.in</strong> started as a small 
              initiative to give second life to pre-owned phones through professional 
              refurbishment.
            </p>
            <p>
              Today, we are proud to be India's trusted platform for <em>certified refurbished 
              smartphones</em>, serving thousands of customers across the country. Our team 
              of certified technicians and quality experts work tirelessly to ensure every 
              phone meets our strict quality standards.
            </p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <h2>Our Expertise in Phone Refurbishment</h2>
          <div className="expertise-grid">
            <div className="expertise-text">
              <p>
                With years of experience in <strong>mobile phone refurbishment</strong> and 
                quality assurance, our team specializes in restoring second-hand phones to 
                their optimal condition using genuine parts and professional techniques.
              </p>
              
              <div className="expertise-areas">
                <h3>Our Core Competencies</h3>
                <ul>
                  <li>32-point quality assessment and testing</li>
                  <li>Professional hardware repair and replacement</li>
                  <li>Software optimization and updates</li>
                  <li>Battery health restoration and replacement</li>
                  <li>Screen and display refurbishment</li>
                  <li>Quality certification and warranty provision</li>
                </ul>
              </div>
            </div>
            <div className="stats-section">
              <h3>Our Impact</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <h4>50,000+</h4>
                  <p>Phones Refurbished</p>
                </div>
                <div className="stat-item">
                  <h4>25,000+</h4>
                  <p>Happy Customers</p>
                </div>
                <div className="stat-item">
                  <h4>98%</h4>
                  <p>Customer Satisfaction</p>
                </div>
                <div className="stat-item">
                  <h4>12 Months</h4>
                  <p>Warranty Coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2>Our Values & Commitments</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>🔍 Transparency</h3>
              <p>Complete transparency in pricing, phone condition, and refurbishment process. No hidden costs or surprises.</p>
            </div>
            <div className="value-card">
              <h3>⭐ Quality</h3>
              <p>Uncompromising quality standards with rigorous testing and genuine parts replacement for all refurbished phones.</p>
            </div>
            <div className="value-card">
              <h3>🌱 Sustainability</h3>
              <p>Promoting environmental sustainability by extending phone lifecycles and reducing electronic waste.</p>
            </div>
            <div className="value-card">
              <h3>🤝 Trust</h3>
              <p>Building long-term relationships with customers through reliable service, warranty support, and honest dealings.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;