import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const Home = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "MobileBuyer.in - Buy & Sell Refurbished Second Hand Phones",
    "description": "India's most trusted platform for buying and selling certified refurbished second-hand phones with warranty and quality assurance",
    "url": "https://mobilebuyer.in/",
    "mainEntity": {
      "@type": "Organization",
      "name": "MobileBuyer.in",
      "description": "Professional refurbished phone marketplace in India"
    }
  };

  return (
    <>
      <SEOHead
        title="MobileBuyer.in - Buy & Sell Refurbished Second Hand Phones | Certified Pre-Owned Smartphones"
        description="India's most trusted platform for buying and selling certified refurbished second-hand phones. Get quality pre-owned smartphones with warranty at best prices."
        keywords="second hand phones, refurbished phones, buy old phones, sell used phones, mobile buyer india, pre-owned smartphones, certified refurbished mobiles"
        canonical="https://mobilebuyer.in/"
        structuredData={structuredData}
      />
      
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="container">
          <h1 id="hero-heading">India's Most Trusted Second Hand Phone Marketplace</h1>
          <h2>Buy & Sell Certified Refurbished Smartphones</h2>
          <p className="hero-description">
            Welcome to MobileBuyer.in - your trusted partner for buying and selling 
            high-quality refurbished second-hand phones. We specialize in professionally 
            refurbished smartphones that come with warranty, quality assurance, and 
            unbeatable prices. Turn your old phone into cash or find your perfect 
            pre-owned smartphone today.
          </p>
          <div className="cta-buttons">
            <Link to="/sell-phone" className="cta-primary" aria-label="Sell your phone now">
              Sell Your Phone
            </Link>
            <button className="cta-secondary" aria-label="Browse refurbished phones">
              Buy Refurbished Phones
            </button>
          </div>
        </div>
      </section>

      <section className="features-section" aria-labelledby="features-heading">
        <div className="container">
          <h2 id="features-heading">Why Choose MobileBuyer.in for Second Hand Phones?</h2>
          <div className="features-grid">
            <article className="feature-card">
              <h3>🔧 Professional Refurbishment</h3>
              <p>
                Every second-hand phone undergoes rigorous 32-point quality checks and 
                professional refurbishment by certified technicians. We restore phones 
                to like-new condition with genuine parts replacement.
              </p>
            </article>
            <article className="feature-card">
              <h3>🛡️ Quality Assurance & Warranty</h3>
              <p>
                All refurbished phones come with comprehensive warranty coverage. 
                We guarantee the quality of our pre-owned smartphones with 
                return policy and customer support.
              </p>
            </article>
            <article className="feature-card">
              <h3>💰 Best Price Guarantee</h3>
              <p>
                Get the highest value when selling your old phone and the best deals 
                when buying refurbished smartphones. Our transparent pricing ensures 
                fair market rates for all transactions.
              </p>
            </article>
            <article className="feature-card">
              <h3>📱 Wide Range of Brands</h3>
              <p>
                From iPhone to Samsung, OnePlus to Xiaomi - we deal with all popular 
                smartphone brands. Find certified pre-owned phones from top manufacturers 
                at affordable prices.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="process-section" aria-labelledby="process-heading">
        <div className="container">
          <h2 id="process-heading">How Our Refurbishment Process Works</h2>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Phone Collection</h3>
              <p>We collect your old phone through our secure pickup service or you can visit our store locations across India.</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Quality Assessment</h3>
              <p>Our certified technicians perform comprehensive 32-point quality checks to assess the phone's condition and functionality.</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Professional Refurbishment</h3>
              <p>We refurbish the phone using genuine parts, replace damaged components, and restore it to optimal working condition.</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Quality Certification</h3>
              <p>Each refurbished phone receives quality certification and warranty before being listed for sale on our platform.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section" aria-labelledby="content-heading">
        <div className="container">
          <h2 id="content-heading">Why Refurbished Phones Are the Smart Choice</h2>
          <div className="content-grid">
            <div className="content-text">
              <p>
                <strong>Refurbished second-hand phones</strong> offer incredible value for money 
                without compromising on quality. At MobileBuyer.in, we believe in sustainable 
                technology consumption while making premium smartphones accessible to everyone.
              </p>
              <p>
                Our <em>certified refurbishment process</em> ensures that every pre-owned phone 
                meets strict quality standards. We replace faulty components, update software, 
                and perform extensive testing to guarantee optimal performance.
              </p>
              <ul>
                <li>Save up to 60% compared to new phone prices</li>
                <li>Environmentally friendly choice - reduce e-waste</li>
                <li>Same functionality as new phones with warranty</li>
                <li>Wide selection of popular brands and models</li>
                <li>Instant cash for your old phones</li>
              </ul>
            </div>
            <div className="content-image">
              <img 
                src="/api/placeholder/500/300" 
                alt="Professional phone refurbishment process showing quality testing and certification of second-hand smartphones"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Buy or Sell Your Phone?</h2>
          <p>Join thousands of satisfied customers who trust MobileBuyer.in for their smartphone needs.</p>
          <div className="cta-buttons">
            <Link to="/sell-phone" className="cta-primary">Get Quote for Your Phone</Link>
            <button className="cta-secondary">Browse Refurbished Phones</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;