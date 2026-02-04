import React from 'react';
import SEOHead from '../components/SEOHead';

const Services = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Phone Refurbishment and Trading Services",
    "description": "Professional phone refurbishment, buying and selling services for second-hand smartphones",
    "provider": {
      "@type": "Organization",
      "name": "MobileBuyer.in"
    }
  };

  return (
    <>
      <SEOHead
        title="Our Services - Phone Refurbishment, Buy & Sell Second Hand Phones | MobileBuyer.in"
        description="Professional phone refurbishment services, instant phone buying, certified pre-owned phone sales, and comprehensive warranty support at MobileBuyer.in"
        keywords="phone refurbishment services, buy old phones, sell used phones, second hand phone services, mobile repair, phone trading services"
        canonical="https://mobilebuyer.in/services"
        structuredData={structuredData}
      />
      
      <section className="services-hero" aria-labelledby="services-heading">
        <div className="container">
          <h1 id="services-heading">Our Professional Phone Services</h1>
          <p className="lead">
            Comprehensive solutions for buying, selling, and refurbishing second-hand 
            phones with quality assurance and customer satisfaction guarantee.
          </p>
        </div>
      </section>

      <section className="services-grid">
        <div className="container">
          <h2>What We Offer</h2>
          
          <div className="service-cards">
            <article className="service-card">
              <h3>📱 Sell Your Old Phone</h3>
              <p>
                Get instant cash for your old smartphone with our transparent pricing 
                and hassle-free selling process. We accept phones in any condition.
              </p>
              <ul>
                <li>Instant price quotes online</li>
                <li>Free doorstep pickup service</li>
                <li>Immediate payment on verification</li>
                <li>Accept all brands and conditions</li>
                <li>Data security and privacy protection</li>
              </ul>
              <div className="service-cta">
                <button className="service-btn">Get Quote Now</button>
              </div>
            </article>

            <article className="service-card">
              <h3>🛒 Buy Refurbished Phones</h3>
              <p>
                Browse our extensive collection of certified refurbished smartphones 
                from top brands at unbeatable prices with warranty coverage.
              </p>
              <ul>
                <li>Wide range of brands and models</li>
                <li>Quality certified refurbished phones</li>
                <li>Up to 12 months warranty</li>
                <li>30-day return policy</li>
                <li>EMI options available</li>
              </ul>
              <div className="service-cta">
                <button className="service-btn">Browse Phones</button>
              </div>
            </article>

            <article className="service-card">
              <h3>🔧 Professional Refurbishment</h3>
              <p>
                Our certified technicians restore phones to like-new condition using 
                genuine parts and industry-standard refurbishment processes.
              </p>
              <ul>
                <li>32-point quality assessment</li>
                <li>Genuine parts replacement</li>
                <li>Battery health restoration</li>
                <li>Software optimization</li>
                <li>Cosmetic restoration</li>
              </ul>
              <div className="service-cta">
                <button className="service-btn">Learn More</button>
              </div>
            </article>

            <article className="service-card">
              <h3>🛡️ Warranty & Support</h3>
              <p>
                Comprehensive warranty coverage and dedicated customer support for 
                all refurbished phones purchased from MobileBuyer.in.
              </p>
              <ul>
                <li>Up to 12 months warranty</li>
                <li>Free repair services</li>
                <li>24/7 customer support</li>
                <li>Replacement guarantee</li>
                <li>Technical assistance</li>
              </ul>
              <div className="service-cta">
                <button className="service-btn">Contact Support</button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <h2>Our Quality Refurbishment Process</h2>
          <div className="process-timeline">
            <div className="timeline-item">
              <div className="timeline-icon">1</div>
              <div className="timeline-content">
                <h3>Initial Assessment</h3>
                <p>Comprehensive evaluation of phone condition, functionality, and repair requirements.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">2</div>
              <div className="timeline-content">
                <h3>Hardware Inspection</h3>
                <p>Detailed testing of all hardware components including battery, screen, camera, and sensors.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">3</div>
              <div className="timeline-content">
                <h3>Parts Replacement</h3>
                <p>Replacement of faulty components with genuine parts to restore optimal functionality.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">4</div>
              <div className="timeline-content">
                <h3>Software Optimization</h3>
                <p>Complete software reset, updates, and optimization for best performance.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">5</div>
              <div className="timeline-content">
                <h3>Quality Certification</h3>
                <p>Final quality checks and certification before listing with warranty coverage.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="brands-section">
        <div className="container">
          <h2>Brands We Deal With</h2>
          <p>We refurbish and trade smartphones from all major brands:</p>
          <div className="brands-grid">
            <div className="brand-item">📱 Apple iPhone</div>
            <div className="brand-item">📱 Samsung Galaxy</div>
            <div className="brand-item">📱 OnePlus</div>
            <div className="brand-item">📱 Xiaomi</div>
            <div className="brand-item">📱 Oppo</div>
            <div className="brand-item">📱 Vivo</div>
            <div className="brand-item">📱 Realme</div>
            <div className="brand-item">📱 Google Pixel</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;