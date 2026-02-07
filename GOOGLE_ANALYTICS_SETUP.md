# 📊 Google Analytics & Ads Setup Guide

## ✅ What's Been Added

### 🔍 **Google Analytics Tracking**
- **Global Tracking**: Added to root layout (loads on all pages)
- **Performance Optimized**: Uses Next.js Script component
- **Strategy**: `afterInteractive` for better page load performance
- **Tracking ID**: G-9EFMCNLXRF

## 📋 Setup Steps

### Step 1: Google Analytics is Now Active
The tracking code has been added to your `layout.tsx` file and will track:
- ✅ **Page Views**: All page visits
- ✅ **User Sessions**: User behavior tracking
- ✅ **Traffic Sources**: Where users come from
- ✅ **Device Data**: Mobile/desktop usage
- ✅ **Geographic Data**: User locations

### Step 2: Add Conversion Tracking (Recommended)

For better Google Ads performance, let's add conversion tracking to your sell-phone form:

```javascript
// Add this to your form submission success
gtag('event', 'conversion', {
  'send_to': 'G-9EFMCNLXRF/CONVERSION_LABEL',
  'value': 1.0,
  'currency': 'INR'
});
```

### Step 3: Enhanced E-commerce Tracking

Track form submissions as conversions:

```javascript
// When form is submitted successfully
gtag('event', 'generate_lead', {
  'currency': 'INR',
  'value': 1000, // Estimated lead value
  'phone_brand': formData.company,
  'phone_model': formData.model
});
```

## 🎯 Google Ads Integration

### For Google Ads Conversion Tracking:

1. **Go to Google Ads**:
   - Sign in to [ads.google.com](https://ads.google.com)
   - Go to Tools & Settings → Conversions

2. **Create Conversion Action**:
   - Click **+ New conversion action**
   - Choose **Website**
   - Name: "Phone Sell Form Submission"
   - Category: "Submit lead form"
   - Value: Use different values for each conversion

3. **Get Conversion Code**:
   - Copy the conversion label
   - Add to your form submission

### Enhanced Conversion Tracking Code:

```javascript
// Add this to your sell-phone form submission
const trackFormSubmission = (formData) => {
  // Basic conversion
  gtag('event', 'conversion', {
    'send_to': 'G-9EFMCNLXRF/YOUR_CONVERSION_LABEL',
    'value': 1000,
    'currency': 'INR'
  });

  // Enhanced e-commerce
  gtag('event', 'generate_lead', {
    'currency': 'INR',
    'value': 1000,
    'phone_brand': formData.company,
    'phone_model': formData.model,
    'phone_storage': formData.storage,
    'phone_age': formData.phoneAgeMonths,
    'customer_phone': formData.contactInfo.phone,
    'customer_email': formData.contactInfo.email
  });
};
```

## 📈 Tracking Events

### Current Automatic Tracking:
- ✅ **Page Views**: All pages tracked automatically
- ✅ **Sessions**: User sessions tracked
- ✅ **Bounce Rate**: Single page visits
- ✅ **Time on Site**: User engagement

### Custom Events You Can Add:

1. **Company Selection**:
```javascript
gtag('event', 'select_company', {
  'company_name': companyName,
  'event_category': 'form_interaction'
});
```

2. **Model Selection**:
```javascript
gtag('event', 'select_model', {
  'phone_model': modelName,
  'company': companyName,
  'event_category': 'form_interaction'
});
```

3. **Form Step Completion**:
```javascript
gtag('event', 'form_step_complete', {
  'step_number': stepNumber,
  'step_name': stepName,
  'event_category': 'form_progress'
});
```

## 🔧 Implementation in Your Form

Let me show you how to add conversion tracking to your sell-phone form:

```javascript
// In your handleSubmit function
const handleSubmit = async () => {
  setIsSubmitting(true);
  
  try {
    // Your existing form submission code...
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: formDataToSend
    });

    if (response.ok) {
      // Track successful form submission
      if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
          'send_to': 'G-9EFMCNLXRF/YOUR_CONVERSION_LABEL',
          'value': 1000,
          'currency': 'INR'
        });

        gtag('event', 'generate_lead', {
          'currency': 'INR',
          'value': 1000,
          'phone_brand': formData.company,
          'phone_model': formData.model,
          'event_category': 'lead_generation'
        });
      }

      setSubmitMessage('✅ Thank you! Our expert will contact you within 2 hours with the best quote for your phone.');
    }
  } catch (error) {
    // Handle error
  } finally {
    setIsSubmitting(false);
  }
};
```

## 📊 Google Analytics Reports

### Key Reports to Monitor:

1. **Audience Overview**:
   - Total users and sessions
   - User demographics
   - Device categories

2. **Acquisition Reports**:
   - Traffic sources (Google Ads, Organic, Direct)
   - Campaign performance
   - Cost per acquisition

3. **Behavior Reports**:
   - Most visited pages
   - User flow through your site
   - Form completion rates

4. **Conversion Reports**:
   - Goal completions
   - E-commerce tracking
   - Attribution models

## 🎯 Google Ads Optimization

### Recommended Campaign Structure:

1. **Search Campaigns**:
   - Keywords: "sell old phone", "phone buyer", "second hand phone"
   - Location: Delhi NCR
   - Device: All devices

2. **Display Campaigns**:
   - Audiences: People interested in mobile phones
   - Placements: Technology websites
   - Demographics: Age 18-45

3. **Remarketing Campaigns**:
   - Target: People who visited sell-phone page
   - Message: "Get quote for your phone in 2 hours"

### Conversion Optimization:
- **Smart Bidding**: Use "Maximize Conversions"
- **Audience Targeting**: Create custom audiences
- **Ad Extensions**: Add sitelinks, callouts
- **Landing Page**: Optimize sell-phone page

## 🔍 Testing Your Setup

### 1. Test Google Analytics:
1. Visit your website
2. Go to Google Analytics Real-time reports
3. Check if your visit appears

### 2. Test Conversion Tracking:
1. Submit your sell-phone form
2. Check Google Analytics Events
3. Verify conversion in Google Ads

### 3. Debug with Google Tag Assistant:
1. Install Google Tag Assistant Chrome extension
2. Visit your website
3. Check if tags are firing correctly

## 📱 Mobile Tracking

### Mobile-Specific Events:
```javascript
// Track mobile vs desktop usage
gtag('event', 'device_type', {
  'device_category': window.innerWidth < 768 ? 'mobile' : 'desktop',
  'screen_resolution': `${screen.width}x${screen.height}`
});

// Track WhatsApp button clicks
document.querySelector('.whatsapp-button').addEventListener('click', () => {
  gtag('event', 'whatsapp_click', {
    'event_category': 'contact',
    'event_label': 'floating_button'
  });
});
```

## 🚀 Advanced Features

### 1. Enhanced E-commerce:
Track phone details as products:
```javascript
gtag('event', 'view_item', {
  'currency': 'INR',
  'value': estimatedValue,
  'items': [{
    'item_id': `${company}-${model}-${storage}`,
    'item_name': `${company} ${model} ${storage}`,
    'item_category': 'smartphone',
    'item_brand': company,
    'price': estimatedValue
  }]
});
```

### 2. User ID Tracking:
```javascript
// Track returning users
gtag('config', 'G-9EFMCNLXRF', {
  'user_id': userPhoneNumber // Use phone number as user ID
});
```

Your Google Analytics is now fully set up and ready to track all user interactions! 📊🎯