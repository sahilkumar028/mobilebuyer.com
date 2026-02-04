import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';
import GoogleSheetsAPI from '../utils/googleSheets';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    brand: '',
    model: '',
    condition: '',
    service: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const result = await GoogleSheetsAPI.submitContactForm(formData);
      
      if (result.success) {
        setSubmitMessage('✅ Thank you! We will contact you shortly.');
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          brand: '',
          model: '',
          condition: '',
          service: '',
          message: ''
        });
      } else {
        setSubmitMessage('❌ ' + result.message);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitMessage('❌ Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact MobileBuyer.in - Get Quote for Your Phone",
    "description": "Contact MobileBuyer.in for instant phone quotes, refurbishment services, and customer support",
    "url": "https://mobilebuyer.in/contact"
  };

  return (
    <>
      <SEOHead
        title="Contact MobileBuyer.in - Get Instant Quote for Your Second Hand Phone"
        description="Contact MobileBuyer.in for instant phone quotes, professional refurbishment services, customer support, and all your second-hand phone needs"
        keywords="contact mobile buyer, phone quote, sell phone contact, refurbished phone support, second hand phone help, mobile buyer customer service"
        canonical="https://mobilebuyer.in/contact"
        structuredData={structuredData}
      />
      
      <section className="contact-hero" aria-labelledby="contact-heading">
        <div className="container">
          <h1 id="contact-heading">Contact MobileBuyer.in</h1>
          <p className="lead">
            Get instant quotes for your old phone, find the perfect refurbished smartphone, 
            or reach out for any assistance. We're here to help!
          </p>
        </div>
      </section>

      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            <div className="contact-card">
              <h3>📞 Call Us</h3>
              <p>Speak directly with our experts</p>
              <a href="tel:+911234567890">+91 12345 67890</a>
              <small>Mon-Sat: 9 AM - 7 PM</small>
            </div>
            <div className="contact-card">
              <h3>📧 Email Us</h3>
              <p>Send us your queries</p>
              <a href="mailto:support@mobilebuyer.in">support@mobilebuyer.in</a>
              <small>Response within 24 hours</small>
            </div>
            <div className="contact-card">
              <h3>💬 WhatsApp</h3>
              <p>Quick support via WhatsApp</p>
              <a href="https://wa.me/911234567890">+91 12345 67890</a>
              <small>Instant responses</small>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-section">
              <h2>Get Instant Quote for Your Phone</h2>
              <form className="contact-form" aria-label="Phone quote and contact form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required 
                    aria-describedby="name-help"
                  />
                  <small id="name-help">Enter your full name for personalized service</small>
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required 
                    aria-describedby="phone-help"
                  />
                  <small id="phone-help">We'll call you back with the quote</small>
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required 
                    aria-describedby="email-help"
                  />
                  <small id="email-help">For sending quote details and updates</small>
                </div>
                
                <div className="form-group">
                  <label htmlFor="brand">Phone Brand</label>
                  <select 
                    id="brand" 
                    name="brand" 
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    required
                  >
                    <option value="">Select Brand</option>
                    <option value="apple">Apple iPhone</option>
                    <option value="samsung">Samsung</option>
                    <option value="oneplus">OnePlus</option>
                    <option value="xiaomi">Xiaomi</option>
                    <option value="oppo">Oppo</option>
                    <option value="vivo">Vivo</option>
                    <option value="realme">Realme</option>
                    <option value="google">Google Pixel</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="model">Phone Model</label>
                  <input 
                    type="text" 
                    id="model" 
                    name="model" 
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    required 
                    aria-describedby="model-help"
                    placeholder="e.g., iPhone 13, Galaxy S21, OnePlus 9"
                  />
                  <small id="model-help">Exact model name for accurate quote</small>
                </div>
                
                <div className="form-group">
                  <label htmlFor="condition">Phone Condition</label>
                  <select 
                    id="condition" 
                    name="condition" 
                    value={formData.condition}
                    onChange={(e) => handleInputChange('condition', e.target.value)}
                    required
                  >
                    <option value="">Select Condition</option>
                    <option value="excellent">Excellent - Like new</option>
                    <option value="good">Good - Minor scratches</option>
                    <option value="fair">Fair - Visible wear</option>
                    <option value="poor">Poor - Damaged/Not working</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="service">Service Required</label>
                  <select 
                    id="service" 
                    name="service" 
                    value={formData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    required
                  >
                    <option value="">Select Service</option>
                    <option value="sell">Sell My Phone</option>
                    <option value="buy">Buy Refurbished Phone</option>
                    <option value="repair">Phone Repair/Refurbishment</option>
                    <option value="support">Customer Support</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Additional Details</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="4" 
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    aria-describedby="message-help"
                    placeholder="Any specific requirements or questions..."
                  ></textarea>
                  <small id="message-help">Help us serve you better with more details</small>
                </div>
                
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Get Instant Quote'}
                </button>

                {submitMessage && (
                  <div className={`submit-message ${submitMessage.includes('✅') ? 'success' : 'error'}`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
            
            <div className="info-section">
              <h3>Why Choose MobileBuyer.in?</h3>
              <ul className="benefits-list">
                <li>✅ Instant price quotes</li>
                <li>✅ Free doorstep pickup</li>
                <li>✅ Immediate payment</li>
                <li>✅ Best market prices</li>
                <li>✅ Secure transactions</li>
                <li>✅ Data privacy protection</li>
                <li>✅ Professional service</li>
                <li>✅ 12 months warranty on purchases</li>
              </ul>
              
              <div className="trust-indicators">
                <h4>Trusted by 25,000+ Customers</h4>
                <div className="ratings">
                  <span>⭐⭐⭐⭐⭐</span>
                  <span>4.8/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="locations-section">
        <div className="container">
          <h2>Our Service Locations</h2>
          <p>We provide doorstep pickup and delivery services across major Indian cities:</p>
          <div className="locations-grid">
            <div className="location-item">🏙️ Delhi NCR</div>
            <div className="location-item">🏙️ Mumbai</div>
            <div className="location-item">🏙️ Bangalore</div>
            <div className="location-item">🏙️ Chennai</div>
            <div className="location-item">🏙️ Hyderabad</div>
            <div className="location-item">🏙️ Pune</div>
            <div className="location-item">🏙️ Kolkata</div>
            <div className="location-item">🏙️ Ahmedabad</div>
          </div>
          <p><em>Expanding to more cities soon!</em></p>
        </div>
      </section>
    </>
  );
};

export default Contact;