import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';
import GoogleSheetsAPI from '../utils/googleSheets';

const SellPhone = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    hasBox: false,
    hasCharger: false,
    condition: '',
    functionalIssues: [],
    physicalCondition: '',
    screenCondition: '',
    batteryHealth: '',
    purchaseYear: '',
    contactInfo: {
      name: '',
      phone: '',
      email: '',
      address: ''
    }
  });

  const phoneModels = {
    apple: [
      'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
      'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
      'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 Mini',
      'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone 12 Mini',
      'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11',
      'iPhone XS Max', 'iPhone XS', 'iPhone XR', 'iPhone X',
      'iPhone 8 Plus', 'iPhone 8', 'iPhone 7 Plus', 'iPhone 7'
    ],
    samsung: [
      'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24',
      'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23',
      'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22',
      'Galaxy S21 Ultra', 'Galaxy S21+', 'Galaxy S21',
      'Galaxy Note 20 Ultra', 'Galaxy Note 20',
      'Galaxy A54', 'Galaxy A34', 'Galaxy A24',
      'Galaxy M54', 'Galaxy M34', 'Galaxy M14'
    ],
    oneplus: [
      'OnePlus 12', 'OnePlus 11', 'OnePlus 10 Pro', 'OnePlus 10T',
      'OnePlus 9 Pro', 'OnePlus 9', 'OnePlus 9R',
      'OnePlus 8 Pro', 'OnePlus 8', 'OnePlus 8T',
      'OnePlus 7 Pro', 'OnePlus 7', 'OnePlus 7T',
      'OnePlus Nord 3', 'OnePlus Nord 2T', 'OnePlus Nord CE 3'
    ],
    xiaomi: [
      'Xiaomi 14', 'Xiaomi 13 Pro', 'Xiaomi 13',
      'Xiaomi 12 Pro', 'Xiaomi 12', 'Xiaomi 11T Pro',
      'Redmi Note 13 Pro+', 'Redmi Note 13 Pro', 'Redmi Note 13',
      'Redmi Note 12 Pro+', 'Redmi Note 12 Pro', 'Redmi Note 12',
      'POCO X6 Pro', 'POCO X6', 'POCO F5 Pro', 'POCO F5'
    ],
    oppo: [
      'Oppo Find X7 Pro', 'Oppo Find X6 Pro', 'Oppo Find X5 Pro',
      'Oppo Reno 11 Pro', 'Oppo Reno 11', 'Oppo Reno 10 Pro',
      'Oppo A79', 'Oppo A78', 'Oppo A58', 'Oppo A18'
    ],
    vivo: [
      'Vivo X100 Pro', 'Vivo X90 Pro', 'Vivo X80 Pro',
      'Vivo V30 Pro', 'Vivo V29 Pro', 'Vivo V27 Pro',
      'Vivo T3 Pro', 'Vivo T2 Pro', 'Vivo Y100'
    ]
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      // Submit to Google Sheets
      const result = await GoogleSheetsAPI.submitSellPhoneForm(formData);
      
      if (result.success) {
        setSubmitMessage('✅ Thank you! We will contact you shortly with a quote for your phone.');
        
        // Optional: Reset form after successful submission
        setTimeout(() => {
          setCurrentStep(1);
          setFormData({
            brand: '',
            model: '',
            hasBox: false,
            hasCharger: false,
            condition: '',
            functionalIssues: [],
            physicalCondition: '',
            screenCondition: '',
            batteryHealth: '',
            purchaseYear: '',
            contactInfo: {
              name: '',
              phone: '',
              email: '',
              address: ''
            }
          });
          setSubmitMessage('');
        }, 5000);
      } else {
        setSubmitMessage('❌ ' + result.message);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitMessage('❌ Failed to submit form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Sell Your Phone - Get Instant Quote | MobileBuyer.in",
    "description": "Sell your old phone and get instant cash. Easy multi-step process to get the best price for your second-hand smartphone.",
    "url": "https://mobilebuyer.in/sell-phone"
  };

  return (
    <>
      <SEOHead
        title="Sell Your Phone - Get Instant Cash Quote | MobileBuyer.in"
        description="Sell your old smartphone and get instant cash. Multi-step evaluation process ensures you get the best price for your second-hand phone with doorstep pickup."
        keywords="sell old phone, sell used phone, phone buyer, instant phone quote, sell smartphone online, second hand phone buyer"
        canonical="https://mobilebuyer.in/sell-phone"
        structuredData={structuredData}
      />

      <section className="sell-phone-hero">
        <div className="container">
          <h1>Sell Your Phone & Get Instant Cash</h1>
          <p>Get the best price for your old smartphone with our easy evaluation process</p>
          <div className="progress-bar">
            <div className="progress-steps">
              <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1. Phone Details</div>
              <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2. Accessories</div>
              <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3. Condition</div>
              <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>4. Contact Info</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sell-phone-form">
        <div className="container">
          <div className="form-container">
            
            {/* Step 1: Phone Brand and Model */}
            {currentStep === 1 && (
              <div className="form-step">
                <h2>Step 1: Select Your Phone</h2>
                <div className="form-group">
                  <label htmlFor="brand">Phone Brand</label>
                  <select 
                    id="brand" 
                    value={formData.brand} 
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    required
                  >
                    <option value="">Select Brand</option>
                    <option value="apple">Apple iPhone</option>
                    <option value="samsung">Samsung</option>
                    <option value="oneplus">OnePlus</option>
                    <option value="xiaomi">Xiaomi / Redmi / POCO</option>
                    <option value="oppo">Oppo</option>
                    <option value="vivo">Vivo</option>
                  </select>
                </div>

                {formData.brand && (
                  <div className="form-group">
                    <label htmlFor="model">Phone Model</label>
                    <select 
                      id="model" 
                      value={formData.model} 
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      required
                    >
                      <option value="">Select Model</option>
                      {phoneModels[formData.brand]?.map(model => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="purchaseYear">Purchase Year</label>
                  <select 
                    id="purchaseYear" 
                    value={formData.purchaseYear} 
                    onChange={(e) => handleInputChange('purchaseYear', e.target.value)}
                  >
                    <option value="">Select Year</option>
                    {Array.from({length: 8}, (_, i) => 2024 - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div className="step-buttons">
                  <button 
                    className="next-btn" 
                    onClick={handleNext}
                    disabled={!formData.brand || !formData.model}
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Accessories */}
            {currentStep === 2 && (
              <div className="form-step">
                <h2>Step 2: Available Accessories</h2>
                <p>Do you have the following items with your phone?</p>
                
                <div className="accessories-grid">
                  <div className="accessory-card">
                    <div className="accessory-icon">📦</div>
                    <h3>Original Box</h3>
                    <div className="radio-group">
                      <label>
                        <input 
                          type="radio" 
                          name="hasBox" 
                          value="true"
                          checked={formData.hasBox === true}
                          onChange={() => handleInputChange('hasBox', true)}
                        />
                        Yes, I have it
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="hasBox" 
                          value="false"
                          checked={formData.hasBox === false}
                          onChange={() => handleInputChange('hasBox', false)}
                        />
                        No, I don't have it
                      </label>
                    </div>
                  </div>

                  <div className="accessory-card">
                    <div className="accessory-icon">🔌</div>
                    <h3>Original Charger</h3>
                    <div className="radio-group">
                      <label>
                        <input 
                          type="radio" 
                          name="hasCharger" 
                          value="true"
                          checked={formData.hasCharger === true}
                          onChange={() => handleInputChange('hasCharger', true)}
                        />
                        Yes, I have it
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="hasCharger" 
                          value="false"
                          checked={formData.hasCharger === false}
                          onChange={() => handleInputChange('hasCharger', false)}
                        />
                        No, I don't have it
                      </label>
                    </div>
                  </div>
                </div>

                <div className="step-buttons">
                  <button className="prev-btn" onClick={handlePrevious}>
                    Previous
                  </button>
                  <button 
                    className="next-btn" 
                    onClick={handleNext}
                    disabled={formData.hasBox === '' || formData.hasCharger === ''}
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Phone Condition */}
            {currentStep === 3 && (
              <div className="form-step">
                <h2>Step 3: Phone Condition Assessment</h2>
                
                <div className="condition-section">
                  <h3>Overall Physical Condition</h3>
                  <div className="condition-options">
                    {[
                      { value: 'excellent', label: 'Excellent', desc: 'Like new, no visible wear' },
                      { value: 'good', label: 'Good', desc: 'Minor scratches, good condition' },
                      { value: 'fair', label: 'Fair', desc: 'Visible wear, some scratches' },
                      { value: 'poor', label: 'Poor', desc: 'Heavy wear, multiple scratches' }
                    ].map(option => (
                      <label key={option.value} className="condition-option">
                        <input 
                          type="radio" 
                          name="physicalCondition" 
                          value={option.value}
                          checked={formData.physicalCondition === option.value}
                          onChange={() => handleInputChange('physicalCondition', option.value)}
                        />
                        <div className="option-content">
                          <strong>{option.label}</strong>
                          <span>{option.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="condition-section">
                  <h3>Screen Condition</h3>
                  <div className="condition-options">
                    {[
                      { value: 'perfect', label: 'Perfect', desc: 'No cracks, scratches, or dead pixels' },
                      { value: 'minor-scratches', label: 'Minor Scratches', desc: 'Light scratches, fully functional' },
                      { value: 'cracked', label: 'Cracked', desc: 'Screen cracks but touch works' },
                      { value: 'damaged', label: 'Damaged', desc: 'Severe damage, touch issues' }
                    ].map(option => (
                      <label key={option.value} className="condition-option">
                        <input 
                          type="radio" 
                          name="screenCondition" 
                          value={option.value}
                          checked={formData.screenCondition === option.value}
                          onChange={() => handleInputChange('screenCondition', option.value)}
                        />
                        <div className="option-content">
                          <strong>{option.label}</strong>
                          <span>{option.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="condition-section">
                  <h3>Battery Health</h3>
                  <div className="condition-options">
                    {[
                      { value: 'excellent', label: 'Excellent (90%+)', desc: 'Lasts full day, like new' },
                      { value: 'good', label: 'Good (70-89%)', desc: 'Good battery life' },
                      { value: 'average', label: 'Average (50-69%)', desc: 'Needs charging twice a day' },
                      { value: 'poor', label: 'Poor (<50%)', desc: 'Very poor battery life' }
                    ].map(option => (
                      <label key={option.value} className="condition-option">
                        <input 
                          type="radio" 
                          name="batteryHealth" 
                          value={option.value}
                          checked={formData.batteryHealth === option.value}
                          onChange={() => handleInputChange('batteryHealth', option.value)}
                        />
                        <div className="option-content">
                          <strong>{option.label}</strong>
                          <span>{option.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="step-buttons">
                  <button className="prev-btn" onClick={handlePrevious}>
                    Previous
                  </button>
                  <button 
                    className="next-btn" 
                    onClick={handleNext}
                    disabled={!formData.physicalCondition || !formData.screenCondition || !formData.batteryHealth}
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Contact Information */}
            {currentStep === 4 && (
              <div className="form-step">
                <h2>Step 4: Contact Information</h2>
                <p>We'll contact you with a quote and arrange pickup</p>
                
                <div className="contact-form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.contactInfo.name}
                      onChange={(e) => handleInputChange('contactInfo.name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      value={formData.contactInfo.phone}
                      onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.contactInfo.email}
                      onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="address">Pickup Address</label>
                    <textarea 
                      id="address" 
                      rows="3"
                      value={formData.contactInfo.address}
                      onChange={(e) => handleInputChange('contactInfo.address', e.target.value)}
                      placeholder="Enter your complete address for doorstep pickup"
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="quote-summary">
                  <h3>Your Phone Details Summary</h3>
                  <div className="summary-grid">
                    <div><strong>Brand:</strong> {formData.brand}</div>
                    <div><strong>Model:</strong> {formData.model}</div>
                    <div><strong>Year:</strong> {formData.purchaseYear}</div>
                    <div><strong>Box:</strong> {formData.hasBox ? 'Yes' : 'No'}</div>
                    <div><strong>Charger:</strong> {formData.hasCharger ? 'Yes' : 'No'}</div>
                    <div><strong>Physical:</strong> {formData.physicalCondition}</div>
                    <div><strong>Screen:</strong> {formData.screenCondition}</div>
                    <div><strong>Battery:</strong> {formData.batteryHealth}</div>
                  </div>
                </div>

                <div className="step-buttons">
                  <button className="prev-btn" onClick={handlePrevious}>
                    Previous
                  </button>
                  <button 
                    className="submit-btn" 
                    onClick={handleSubmit}
                    disabled={!formData.contactInfo.name || !formData.contactInfo.phone || !formData.contactInfo.email || isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Get My Quote'}
                  </button>
                </div>

                {submitMessage && (
                  <div className={`submit-message ${submitMessage.includes('✅') ? 'success' : 'error'}`}>
                    {submitMessage}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  );
};

export default SellPhone;