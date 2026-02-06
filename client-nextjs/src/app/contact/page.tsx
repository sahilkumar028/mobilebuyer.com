'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  brand: string;
  model: string;
  condition: string;
  service: string;
  message: string;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    brand: '',
    model: '',
    condition: '',
    service: '',
    message: ''
  });

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const payload = {
        type: 'contact_form',
        timestamp: new Date().toISOString(),
        customerName: formData.name,
        customerPhone: formData.phone,
        customerEmail: formData.email,
        phoneBrand: formData.brand,
        phoneModel: formData.model,
        phoneCondition: formData.condition,
        serviceRequired: formData.service,
        message: formData.message,
        status: 'New Contact'
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
          return;
        }
        
        const jsonResult = JSON.parse(result);
        if (jsonResult.success) {
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
          setSubmitMessage('❌ ' + (jsonResult.message || 'Submission failed. Please try again.'));
        }
      } catch (parseError) {
        console.log('Response parsing failed, assuming success:', parseError);
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
      }

    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitMessage('❌ Failed to submit form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact MobileBuyer.in - Get Quote for Your Phone",
              "description": "Contact MobileBuyer.in for instant phone quotes, refurbishment services, and customer support",
              "url": "https://mobilebuyer.in/contact"
            })
          }}
        />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Contact MobileBuyer.in</h1>
            <p className="text-xl">Get instant quotes for your old phone, find the perfect refurbished smartphone, or reach out for any assistance. We're here to help!</p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Call Us</h3>
                <p className="text-gray-600 mb-4">Speak directly with our experts</p>
                <a href="tel:+919210657563" className="text-blue-600 hover:text-blue-800 font-semibold block">+91-9210657563</a>
                <a href="tel:+919205124447" className="text-blue-600 hover:text-blue-800 font-semibold block">+91-9205124447</a>
                <small className="text-gray-500">Mon-Sat: 10 AM - 8 PM</small>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Email Us</h3>
                <p className="text-gray-600 mb-4">Send us your queries</p>
                <a href="mailto:praveen9@gmail.com" className="text-purple-600 hover:text-purple-800 font-semibold block">praveen9@gmail.com</a>
                <a href="mailto:praveen@mobilebuyer.in" className="text-purple-600 hover:text-purple-800 font-semibold block">praveen@mobilebuyer.in</a>
                <small className="text-gray-500">Response within 24 hours</small>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">WhatsApp</h3>
                <p className="text-gray-600 mb-4">Quick support via WhatsApp</p>
                <a href="https://wa.me/919210657563" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 font-semibold block">+91-9210657563</a>
                <a href="https://wa.me/919205124447" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 font-semibold block">+91-9205124447</a>
                <small className="text-gray-500">Instant responses</small>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Get Instant Quote for Your Phone</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                    <small className="text-gray-500">Enter your full name for personalized service</small>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                    <small className="text-gray-500">We'll call you back with the quote</small>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                    <small className="text-gray-500">For sending quote details and updates</small>
                  </div>

                  <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">Phone Brand</label>
                    <select
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                  <div>
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">Phone Model</label>
                    <input
                      type="text"
                      id="model"
                      value={formData.model}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., iPhone 13, Galaxy S21, OnePlus 9"
                    />
                    <small className="text-gray-500">Exact model name for accurate quote</small>
                  </div>

                  <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">Phone Condition</label>
                    <select
                      id="condition"
                      value={formData.condition}
                      onChange={(e) => handleInputChange('condition', e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Condition</option>
                      <option value="excellent">Excellent - Like new</option>
                      <option value="good">Good - Minor scratches</option>
                      <option value="fair">Fair - Visible wear</option>
                      <option value="poor">Poor - Damaged/Not working</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">Service Required</label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Service</option>
                      <option value="sell">Sell My Phone</option>
                      <option value="buy">Buy Refurbished Phone</option>
                      <option value="repair">Phone Repair/Refurbishment</option>
                      <option value="support">Customer Support</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Any specific requirements or questions..."
                    />
                    <small className="text-gray-500">Help us serve you better with more details</small>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Get Instant Quote'}
                  </button>

                  {submitMessage && (
                    <div className={`p-4 rounded-lg text-center font-semibold ${
                      submitMessage.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </div>

              {/* Info Section */}
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Why Choose MobileBuyer.in?</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Instant price quotes</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Free doorstep pickup</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Immediate payment</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Best market prices</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Secure transactions</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Data privacy protection</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Professional service</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> 12 months warranty on purchases</li>
                  </ul>

                  <div className="bg-blue-50 p-4 rounded-lg mt-6">
                    <h4 className="font-semibold text-blue-800 mb-2">Trusted by 25,000+ Customers</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                      <span className="text-blue-700 font-medium">4.8/5 Rating</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Our Service Locations</h3>
                  <p className="text-gray-600 mb-4">We provide doorstep pickup and delivery services across Delhi NCR:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-red-100 p-3 rounded-lg text-center">
                      <span className="text-red-800 font-medium">🏙️ Delhi</span>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg text-center">
                      <span className="text-blue-800 font-medium">🏙️ Noida</span>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg text-center">
                      <span className="text-green-800 font-medium">🏙️ Gurgaon</span>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg text-center">
                      <span className="text-purple-800 font-medium">🏙️ Faridabad</span>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-lg text-center">
                      <span className="text-orange-800 font-medium">🏙️ Ghaziabad</span>
                    </div>
                    <div className="bg-indigo-100 p-3 rounded-lg text-center">
                      <span className="text-indigo-800 font-medium">🏙️ Delhi NCR</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-center mt-4"><em>Expanding to more cities soon!</em></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}