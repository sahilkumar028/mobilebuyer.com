'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

// Note: This metadata would need to be moved to a parent layout or page.tsx file
// since this is a client component. For now, we'll add it via Head component.
import Head from 'next/head';

interface Company {
  name: string;
  logo: string;
}

interface FormData {
  company: string;
  model: string;
  storage: string;
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
    company: '',
    model: '',
    storage: '',
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

  // Dynamic data states with caching
  const [companies, setCompanies] = useState<Company[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [storageOptions, setStorageOptions] = useState<string[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingStorage, setLoadingStorage] = useState(false);

  // Cache for API responses
  const [dataCache, setDataCache] = useState<{
    companies?: Company[];
    models?: { [key: string]: string[] };
    storage?: { [key: string]: string[] };
  }>({});

  // Load companies on component mount with caching
  useEffect(() => {
    if (dataCache.companies) {
      setCompanies(dataCache.companies);
    } else {
      loadCompanies();
    }
  }, []);

  // Load models when company changes with caching
  useEffect(() => {
    if (formData.company) {
      const cacheKey = formData.company;
      if (dataCache.models?.[cacheKey]) {
        setModels(dataCache.models[cacheKey]);
      } else {
        loadModels(formData.company);
      }
      // Reset model and storage when company changes
      setFormData(prev => ({ ...prev, model: '', storage: '' }));
      setStorageOptions([]);
    }
  }, [formData.company]);

  // Load storage options when model changes with caching
  useEffect(() => {
    if (formData.company && formData.model) {
      const cacheKey = `${formData.company}-${formData.model}`;
      if (dataCache.storage?.[cacheKey]) {
        setStorageOptions(dataCache.storage[cacheKey]);
      } else {
        loadStorageOptions(formData.company, formData.model);
      }
      // Reset storage when model changes
      setFormData(prev => ({ ...prev, storage: '' }));
    }
  }, [formData.model]);

  const loadCompanies = async () => {
    try {
      setLoadingCompanies(true);
      const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

      if (!scriptURL) {
        // Use static fallback immediately if no URL
        const staticCompanies = getStaticCompaniesWithLogos();
        setCompanies(staticCompanies);
        setDataCache(prev => ({ ...prev, companies: staticCompanies }));
        return;
      }

      const response = await fetch(`${scriptURL}?action=getCompanies`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setCompanies(data);
      setDataCache(prev => ({ ...prev, companies: data }));
    } catch (error) {
      console.error('Error loading companies:', error);
      // Fallback to static data if API fails
      const fallbackCompanies = getStaticCompaniesWithLogos();
      setCompanies(fallbackCompanies);
      setDataCache(prev => ({ ...prev, companies: fallbackCompanies }));
    } finally {
      setLoadingCompanies(false);
    }
  };

  const loadModels = async (company: string) => {
    try {
      setLoadingModels(true);
      const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

      if (!scriptURL) {
        const staticModels = getStaticModels(company);
        setModels(staticModels);
        setDataCache(prev => ({
          ...prev,
          models: { ...prev.models, [company]: staticModels }
        }));
        return;
      }

      const response = await fetch(`${scriptURL}?action=getModels&company=${encodeURIComponent(company)}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setModels(data);
      setDataCache(prev => ({
        ...prev,
        models: { ...prev.models, [company]: data }
      }));
    } catch (error) {
      console.error('Error loading models:', error);
      const fallbackModels = getStaticModels(company);
      setModels(fallbackModels);
      setDataCache(prev => ({
        ...prev,
        models: { ...prev.models, [company]: fallbackModels }
      }));
    } finally {
      setLoadingModels(false);
    }
  };

  const loadStorageOptions = async (company: string, model: string) => {
    try {
      setLoadingStorage(true);
      const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      const cacheKey = `${company}-${model}`;

      if (!scriptURL) {
        const staticStorage = getStaticStorage(company, model);
        setStorageOptions(staticStorage);
        setDataCache(prev => ({
          ...prev,
          storage: { ...prev.storage, [cacheKey]: staticStorage }
        }));
        return;
      }

      const response = await fetch(`${scriptURL}?action=getStorage&company=${encodeURIComponent(company)}&model=${encodeURIComponent(model)}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setStorageOptions(data);
      setDataCache(prev => ({
        ...prev,
        storage: { ...prev.storage, [cacheKey]: data }
      }));
    } catch (error) {
      console.error('Error loading storage options:', error);
      const fallbackStorage = getStaticStorage(company, model);
      setStorageOptions(fallbackStorage);
      setDataCache(prev => ({
        ...prev,
        storage: { ...prev.storage, [`${company}-${model}`]: fallbackStorage }
      }));
    } finally {
      setLoadingStorage(false);
    }
  };

  // Static data fallbacks for better performance
  const getStaticCompaniesWithLogos = (): Company[] => {
    return [
      {
        name: 'Apple',
        logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/apple.svg'
      },
      {
        name: 'Samsung',
        logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/samsung.svg'
      },
      {
        name: 'OnePlus',
        logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/oneplus.svg'
      },
      {
        name: 'Xiaomi',
        logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/xiaomi.svg'
      },
      {
        name: 'Oppo',
        logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/oppo.svg'
      },
      {
        name: 'Vivo',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Vivo_Logo.svg/200px-Vivo_Logo.svg.png'
      }
    ];
  };

  const getStaticModels = (company: string): string[] => {
    const staticData: { [key: string]: string[] } = {
      'Apple': [
        'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
        'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
        'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 Mini',
        'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone 12 Mini'
      ],
      'Samsung': [
        'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24',
        'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23',
        'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22'
      ],
      'OnePlus': [
        'OnePlus 12', 'OnePlus 11', 'OnePlus 10 Pro', 'OnePlus 10T',
        'OnePlus 9 Pro', 'OnePlus 9', 'OnePlus 8 Pro'
      ],
      'Xiaomi': [
        'Xiaomi 14', 'Xiaomi 13 Pro', 'Xiaomi 13',
        'Redmi Note 13 Pro+', 'Redmi Note 13 Pro', 'Redmi Note 12 Pro'
      ],
      'Oppo': [
        'Oppo Find X7 Pro', 'Oppo Find X6 Pro', 'Oppo Reno 11 Pro'
      ],
      'Vivo': [
        'Vivo X100 Pro', 'Vivo X90 Pro', 'Vivo V30 Pro'
      ]
    };

    return staticData[company] || [];
  };

  const getStaticStorage = (company: string, model: string): string[] => {
    // Most phones have these common storage options
    if (company === 'Apple') {
      if (model.includes('Pro Max') || model.includes('Pro')) {
        return ['128GB', '256GB', '512GB', '1TB'];
      } else {
        return ['128GB', '256GB', '512GB'];
      }
    } else if (company === 'Samsung') {
      if (model.includes('Ultra')) {
        return ['256GB', '512GB', '1TB'];
      } else {
        return ['128GB', '256GB', '512GB'];
      }
    } else {
      return ['128GB', '256GB', '512GB'];
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const payload = {
        type: 'sell_phone',
        timestamp: new Date().toISOString(),
        company: formData.company,
        model: formData.model,
        storage: formData.storage,
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
          setSubmitMessage('✅ Thank you! Our expert will contact you within 2 hours with the best quote for your phone.');
          return;
        }

        const jsonResult = JSON.parse(result);
        if (jsonResult.success) {
          setSubmitMessage('✅ Thank you! Our expert will contact you within 2 hours with the best quote for your phone.');
        } else {
          setSubmitMessage('❌ ' + (jsonResult.message || 'Submission failed. Please try again.'));
        }
      } catch (parseError) {
        console.log('Response parsing failed, assuming success:', parseError);
        setSubmitMessage('✅ Thank you! Our expert will contact you within 2 hours with the best quote for your phone.');
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

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return formData.company && formData.model && formData.storage && formData.phoneAgeMonths;
      case 2:
        return formData.hasBox !== null && formData.hasCharger !== null;
      case 3:
        return formData.physicalCondition && formData.screenCondition && formData.batteryHealth;
      default:
        return true;
    }
  };

  return (
    <>
      <Head>
        <title>Sell Your Phone - Get Expert Quote | MobileBuyer.in</title>
        <meta name="description" content="Submit your phone details and our expert will contact you within 2 hours with a personalized quote. Best prices guaranteed with free pickup in Delhi NCR." />
        <meta name="keywords" content="sell phone online, sell old phone cash, phone buyback India, get phone quote, sell smartphone online Delhi NCR" />
        <link rel="canonical" href="https://mobilebuyer.in/sell-phone" />
      </Head>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Sell Your Phone for the Best Price</h1>
            <p className="text-xl mb-8">Submit your phone details and get a personalized quote from our expert within 2 hours</p>

            {/* Progress Bar */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'
                    }`}>
                    {step}
                  </div>
                  {step < 4 && <div className={`w-16 h-1 ${step < currentStep ? 'bg-blue-500' : 'bg-gray-600'}`} />}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">✓ Expert Evaluation</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">✓ Best Market Price</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">✓ Free Pickup</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">✓ Quick Response</span>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-semibold mb-2">Submit Details</h3>
                <p className="text-gray-600 text-sm">Fill in your phone information and condition</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-semibold mb-2">Expert Review</h3>
                <p className="text-gray-600 text-sm">Our expert evaluates your phone details</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-semibold mb-2">Get Quote</h3>
                <p className="text-gray-600 text-sm">Receive personalized quote within 2 hours</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                <h3 className="font-semibold mb-2">Get Paid</h3>
                <p className="text-gray-600 text-sm">Free pickup and immediate payment</p>
              </div>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      {loadingCompanies ? (
                        <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 animate-pulse">
                          <div className="h-5 bg-gray-300 rounded"></div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {companies.map(company => (
                            <div
                              key={company.name}
                              onClick={() => setFormData({ ...formData, company: company.name })}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${formData.company === company.name
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                              <div className="flex flex-col items-center space-y-2">
                                <img
                                  src={company.logo}
                                  alt={company.name}
                                  className="w-8 h-8 object-contain"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `https://via.placeholder.com/32x32/cccccc/666666?text=${company.name.charAt(0)}`;
                                  }}
                                />
                                <span className="text-sm font-medium text-center">{company.name}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {formData.company && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                        {loadingModels ? (
                          <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 animate-pulse">
                            <div className="h-5 bg-gray-300 rounded"></div>
                          </div>
                        ) : (
                          <select
                            value={formData.model}
                            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Model</option>
                            {models.map(model => (
                              <option key={model} value={model}>{model}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    )}

                    {formData.model && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Storage</label>
                        {loadingStorage ? (
                          <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 animate-pulse">
                            <div className="h-5 bg-gray-300 rounded"></div>
                          </div>
                        ) : (
                          <select
                            value={formData.storage}
                            onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Storage</option>
                            {storageOptions.map(storage => (
                              <option key={storage} value={storage}>{storage}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">How old is your phone? (in months)</label>
                      <input
                        type="number"
                        value={formData.phoneAgeMonths}
                        onChange={(e) => setFormData({ ...formData, phoneAgeMonths: e.target.value })}
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
                            onChange={() => setFormData({ ...formData, hasBox: true })}
                            className="mr-3"
                          />
                          Yes, I have the original box
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="hasBox"
                            checked={formData.hasBox === false}
                            onChange={() => setFormData({ ...formData, hasBox: false })}
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
                            onChange={() => setFormData({ ...formData, hasCharger: true })}
                            className="mr-3"
                          />
                          Yes, I have the original charger
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="hasCharger"
                            checked={formData.hasCharger === false}
                            onChange={() => setFormData({ ...formData, hasCharger: false })}
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
                          { value: 'excellent', label: 'Excellent', desc: 'Like new, no visible wear', icon: '✨' },
                          { value: 'good', label: 'Good', desc: 'Minor scratches, works perfectly', icon: '👍' },
                          { value: 'fair', label: 'Fair', desc: 'Visible wear, all functions work', icon: '👌' },
                          { value: 'poor', label: 'Poor', desc: 'Heavy wear, some issues', icon: '⚠️' }
                        ].map(condition => (
                          <label key={condition.value} className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="physicalCondition"
                              value={condition.value}
                              checked={formData.physicalCondition === condition.value}
                              onChange={(e) => setFormData({ ...formData, physicalCondition: e.target.value })}
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
                          { value: 'perfect', label: 'Perfect', desc: 'No scratches or cracks', icon: '💎' },
                          { value: 'minor-scratches', label: 'Minor Scratches', desc: 'Light scratches, barely visible', icon: '🔍' },
                          { value: 'cracked', label: 'Cracked', desc: 'Screen has cracks but works', icon: '💔' },
                          { value: 'damaged', label: 'Damaged', desc: 'Screen issues, touch problems', icon: '🚫' }
                        ].map(condition => (
                          <label key={condition.value} className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="screenCondition"
                              value={condition.value}
                              checked={formData.screenCondition === condition.value}
                              onChange={(e) => setFormData({ ...formData, screenCondition: e.target.value })}
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
                          { value: 'excellent', label: 'Excellent', desc: 'Lasts full day, 80%+ health', icon: '🔋' },
                          { value: 'good', label: 'Good', desc: 'Good battery life, 60-80% health', icon: '🔋' },
                          { value: 'average', label: 'Average', desc: 'Moderate battery life, 40-60% health', icon: '🪫' },
                          { value: 'poor', label: 'Poor', desc: 'Poor battery life, needs frequent charging', icon: '🔴' }
                        ].map(condition => (
                          <label key={condition.value} className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="batteryHealth"
                              value={condition.value}
                              checked={formData.batteryHealth === condition.value}
                              onChange={(e) => setFormData({ ...formData, batteryHealth: e.target.value })}
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

                  {/* Contact Form - No Price Display */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">📞 We'll Contact You Soon!</h3>
                    <p className="text-blue-700">
                      Our expert will review your phone details and contact you within 2 hours with the best quote.
                      We ensure fair and competitive pricing for all phones.
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
                          contactInfo: { ...formData.contactInfo, name: e.target.value }
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
                          contactInfo: { ...formData.contactInfo, phone: e.target.value }
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
                          contactInfo: { ...formData.contactInfo, email: e.target.value }
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
                          contactInfo: { ...formData.contactInfo, address: e.target.value }
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
                    disabled={!canProceedToNextStep()}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit for Quote'}
                  </button>
                )}
              </div>

              {/* Submit Message */}
              {submitMessage && (
                <div className={`mt-4 p-4 rounded-lg text-center font-semibold ${submitMessage.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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