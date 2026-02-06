'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

// Note: This metadata would need to be moved to a parent layout or page.tsx file
// since this is a client component. For now, we'll add it via Head component.
import Head from 'next/head';

interface FormData {
  brand: string;
  model: string;
  phoneAgeMonths: string;
  hasBox: boolean;
  hasCharger: boolean;
  physicalCondition: string;
  screenCondition: string;
  batteryHealth: string;
  contactInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
}

export default function SellPhone() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    brand: '',
    model: '',
    phoneAgeMonths: '',
    hasBox: false,
    hasCharger: false,
    physicalCondition: '',
    screenCondition: '',
    batteryHealth: '',
    contactInfo: {
      name: '',
      phone: '',
      email: '',
      address: ''
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const calculateEstimatedValue = (data: FormData): number => {
    // Simplified calculation - you can use the same logic from your React app
    const baseValues: { [key: string]: { [key: string]: number } } = {
      'apple': {
        'iPhone 15 Pro Max': 80000,
        'iPhone 15 Pro': 70000,
        'iPhone 14 Pro Max': 65000,
        'iPhone 13 Pro': 42000,
        'iPhone 12': 28000,
      },
      'samsung': {
        'Galaxy S24 Ultra': 70000,
        'Galaxy S23 Ultra': 55000,
        'Galaxy S22 Ultra': 45000,
      }
    };

    const baseValue = baseValues[data.brand]?.[data.model] || 15000;
    
    const conditionMultipliers: { [key: string]: number } = {
      excellent: 0.75,
      good: 0.65,
      fair: 0.50,
      poor: 0.35
    };

    let estimatedValue = baseValue;
    estimatedValue *= conditionMultipliers[data.physicalCondition] || 0.5;
    
    if (data.hasBox) estimatedValue *= 1.05;
    if (data.hasCharger) estimatedValue *= 1.03;

    // Convert months to years for age calculation
    const phoneAgeInMonths = parseInt(data.phoneAgeMonths) || 0;
    const phoneAgeInYears = phoneAgeInMonths / 12;
    const ageMultiplier = Math.max(0.3, 1 - (phoneAgeInYears * 0.15));
    estimatedValue *= ageMultiplier;

    return Math.round(estimatedValue);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const payload = {
        type: 'sell_phone',
        timestamp: new Date().toISOString(),
        brand: formData.brand,
        model: formData.model,
        phoneAgeMonths: formData.phoneAgeMonths,
        hasBox: formData.hasBox ? 'Yes' : 'No',
        hasCharger: formData.hasCharger ? 'Yes' : 'No',
        physicalCondition: formData.physicalCondition,
        screenCondition: formData.screenCondition,
        batteryHealth: formData.batteryHealth,
        customerName: formData.contactInfo.name,
        customerPhone: formData.contactInfo.phone,
        customerEmail: formData.contactInfo.email,
        pickupAddress: formData.contactInfo.address,
        estimatedValue: calculateEstimatedValue(formData),
        status: 'New Lead'
      };

      const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      
      if (!scriptURL) {
        throw new Error('Google Script URL not configured');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(payload));

      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formDataToSend
      });

      // Handle response
      try {
        const result = await response.text();
        console.log('Response from Google Sheets:', result);
        
        if (!result || result.trim() === '') {
          setSubmitMessage('✅ Thank you! We will contact you shortly with a quote for your phone.');
          return;
        }
        
        const jsonResult = JSON.parse(result);
        if (jsonResult.success) {
          setSubmitMessage('✅ Thank you! We will contact you shortly with a quote for your phone.');
        } else {
          setSubmitMessage('❌ ' + (jsonResult.message || 'Submission failed. Please try again.'));
        }
      } catch (parseError) {
        console.log('Response parsing failed, assuming success:', parseError);
        setSubmitMessage('✅ Thank you! We will contact you shortly with a quote for your phone.');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('❌ Failed to submit form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <Head>
        <title>Sell Your Phone - Get Instant Cash Quote | MobileBuyer.in</title>
        <meta name="description" content="Sell your old phone for instant cash. Get free pickup, 32-point quality check, and best prices for your second-hand smartphone. Submit details in 4 easy steps." />
        <meta name="keywords" content="sell phone online, sell old phone cash, phone buyback India, instant phone quote, sell smartphone online" />
        <link rel="canonical" href="https://mobilebuyer.in/sell-phone" />
      </Head>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Sell Your Phone</h1>
            <p className="text-xl mb-8">Get an instant quote and sell your phone in 4 easy steps</p>
            
            {/* Progress Bar */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && <div className={`w-16 h-1 ${step < currentStep ? 'bg-blue-500' : 'bg-gray-600'}`} />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8">
              
              {/* Step 1: Phone Details */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-center">Phone Details</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                      <select 
                        value={formData.brand}
                        onChange={(e) => setFormData({...formData, brand: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Brand</option>
                        <option value="apple">Apple</option>
                        <option value="samsung">Samsung</option>
                        <option value="oneplus">OnePlus</option>
                        <option value="xiaomi">Xiaomi</option>
                        <option value="oppo">Oppo</option>
                        <option value="vivo">Vivo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                      <input
                        type="text"
                        value={formData.model}
                        onChange={(e) => setFormData({...formData, model: e.target.value})}
                        placeholder="e.g., iPhone 13, Galaxy S23"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">How old is your phone? (in months)</label>
                      <input
                        type="number"
                        value={formData.phoneAgeMonths}
                        onChange={(e) => setFormData({...formData, phoneAgeMonths: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter age in months (e.g., 6, 12, 24)"
                        min="0"
                        max="120"
                      />
                      <small className="text-gray-500 mt-1 block">
                        Examples: 6 months (new), 12 months (1 year), 24 months (2 years)
                      </small>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Accessories */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-center">Accessories</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">📦 Original Box</h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="hasBox"
                            checked={formData.hasBox === true}
                            onChange={() => setFormData({...formData, hasBox: true})}
                            className="mr-3"
                          />
                          Yes, I have the original box
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="hasBox"
                            checked={formData.hasBox === false}
                            onChange={() => setFormData({...formData, hasBox: false})}
                            className="mr-3"
                          />
                          No, I don't have the original box
                        </label>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">🔌 Original Charger</h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="hasCharger"
                            checked={formData.hasCharger === true}
                            onChange={() => setFormData({...formData, hasCharger: true})}
                            className="mr-3"
                          />
                          Yes, I have the original charger
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="hasCharger"
                            checked={formData.hasCharger === false}
                            onChange={() => setFormData({...formData, hasCharger: false})}
                            className="mr-3"
                          />
                          No, I don't have the original charger
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Condition */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-center">Phone Condition</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Physical Condition</h3>
                      <div className="space-y-2">
                        {[
                          {value: 'excellent', label: 'Excellent', desc: 'Like new, no visible wear', icon: '✨'},
                          {value: 'good', label: 'Good', desc: 'Minor scratches, works perfectly', icon: '👍'},
                          {value: 'fair', label: 'Fair', desc: 'Visible wear, all functions work', icon: '👌'},
                          {value: 'poor', label: 'Poor', desc: 'Heavy wear, some issues', icon: '⚠️'}
                        ].map(condition => (
                          <label key={condition.value} className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="physicalCondition"
                              value={condition.value}
                              checked={formData.physicalCondition === condition.value}
                              onChange={(e) => setFormData({...formData, physicalCondition: e.target.value})}
                              className="mr-3 mt-1"
                            />
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">{condition.icon}</span>
                              <div>
                                <div className="font-medium">{condition.label}</div>
                                <div className="text-sm text-gray-600">{condition.desc}</div>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Screen Condition</h3>
                      <div className="space-y-2">
                        {[
                          {value: 'perfect', label: 'Perfect', desc: 'No scratches or cracks', icon: '💎'},
                          {value: 'minor-scratches', label: 'Minor Scratches', desc: 'Light scratches, barely visible', icon: '🔍'},
                          {value: 'cracked', label: 'Cracked', desc: 'Screen has cracks but works', icon: '💔'},
                          {value: 'damaged', label: 'Damaged', desc: 'Screen issues, touch problems', icon: '🚫'}
                        ].map(condition => (
                          <label key={condition.value} className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="screenCondition"
                              value={condition.value}
                              checked={formData.screenCondition === condition.value}
                              onChange={(e) => setFormData({...formData, screenCondition: e.target.value})}
                              className="mr-3 mt-1"
                            />
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">{condition.icon}</span>
                              <div>
                                <div className="font-medium">{condition.label}</div>
                                <div className="text-sm text-gray-600">{condition.desc}</div>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Battery Health</h3>
                      <div className="space-y-2">
                        {[
                          {value: 'excellent', label: 'Excellent', desc: 'Lasts full day, 80%+ health', icon: '🔋'},
                          {value: 'good', label: 'Good', desc: 'Good battery life, 60-80% health', icon: '🔋'},
                          {value: 'average', label: 'Average', desc: 'Moderate battery life, 40-60% health', icon: '🪫'},
                          {value: 'poor', label: 'Poor', desc: 'Poor battery life, needs frequent charging', icon: '🔴'}
                        ].map(condition => (
                          <label key={condition.value} className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="batteryHealth"
                              value={condition.value}
                              checked={formData.batteryHealth === condition.value}
                              onChange={(e) => setFormData({...formData, batteryHealth: e.target.value})}
                              className="mr-3 mt-1"
                            />
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">{condition.icon}</span>
                              <div>
                                <div className="font-medium">{condition.label}</div>
                                <div className="text-sm text-gray-600">{condition.desc}</div>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Contact Info */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-center">Contact Information</h2>
                  
                  {/* Estimated Value */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Estimated Value</h3>
                    <div className="text-3xl font-bold text-green-600">
                      ₹{calculateEstimatedValue(formData).toLocaleString()}
                    </div>
                    <p className="text-sm text-green-700 mt-2">
                      *Final price will be confirmed after physical inspection
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.contactInfo.name}
                        onChange={(e) => setFormData({
                          ...formData, 
                          contactInfo: {...formData.contactInfo, name: e.target.value}
                        })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.contactInfo.phone}
                        onChange={(e) => setFormData({
                          ...formData, 
                          contactInfo: {...formData.contactInfo, phone: e.target.value}
                        })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={formData.contactInfo.email}
                        onChange={(e) => setFormData({
                          ...formData, 
                          contactInfo: {...formData.contactInfo, email: e.target.value}
                        })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Address</label>
                      <textarea
                        value={formData.contactInfo.address}
                        onChange={(e) => setFormData({
                          ...formData, 
                          contactInfo: {...formData.contactInfo, address: e.target.value}
                        })}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                >
                  Previous
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                )}
              </div>

              {/* Submit Message */}
              {submitMessage && (
                <div className={`mt-4 p-4 rounded-lg text-center font-semibold ${
                  submitMessage.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {submitMessage}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}