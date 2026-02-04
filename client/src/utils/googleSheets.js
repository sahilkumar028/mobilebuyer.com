// Google Sheets Integration for MobileBuyer.in
// This sends form data directly to Google Sheets without backend

class GoogleSheetsAPI {
    constructor() {
        // Your Google Apps Script Web App URL
        this.scriptURL = 'https://script.google.com/macros/s/AKfycbz5htoRiwm3d9yOso1e55sSxWdZJOnK2UZPJVguXFxKc-IeS8BoS4vMB3_GaI_JoKLq/exec';

        // Development mode - set to true when testing locally
        this.isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

        // Force development mode for testing (remove this line for production)
        this.isDevelopment = false;

        // Debug log
        console.log('🔧 GoogleSheetsAPI initialized:', {
            hostname: window.location.hostname,
            isDevelopment: this.isDevelopment,
            scriptURL: this.scriptURL
        });
    }

    // Send sell phone form data to Google Sheets
    async submitSellPhoneForm(formData) {
        console.log('🔧 submitSellPhoneForm called, isDevelopment:', this.isDevelopment);

        // In development mode, simulate successful submission for testing
        if (this.isDevelopment) {
            console.log('🔧 Development Mode - Form Data:');
            console.table({
                'Customer Name': formData.contactInfo.name,
                'Phone': formData.contactInfo.phone,
                'Email': formData.contactInfo.email,
                'Brand': formData.brand,
                'Model': formData.model,
                'Year': formData.purchaseYear,
                'Physical Condition': formData.physicalCondition,
                'Screen Condition': formData.screenCondition,
                'Battery Health': formData.batteryHealth,
                'Has Box': formData.hasBox ? 'Yes' : 'No',
                'Has Charger': formData.hasCharger ? 'Yes' : 'No',
                'Estimated Value': '₹' + this.calculateEstimatedValue(formData),
                'Pickup Address': formData.contactInfo.address
            });

            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
            return {
                success: true,
                message: '✅ Development Mode: Form data logged above! Deploy to production to save to Google Sheets.'
            };
        }

        // Production mode - submit to Google Sheets
        console.log('🚀 Production Mode - Submitting to Google Sheets...');

        // Production mode - submit to Google Sheets
        console.log('🚀 Production Mode - Submitting to Google Sheets...');

        try {
            const payload = {
                type: 'sell_phone',
                timestamp: new Date().toISOString(),
                brand: formData.brand,
                model: formData.model,
                purchaseYear: formData.purchaseYear,
                hasBox: formData.hasBox ? 'Yes' : 'No',
                hasCharger: formData.hasCharger ? 'Yes' : 'No',
                physicalCondition: formData.physicalCondition,
                screenCondition: formData.screenCondition,
                batteryHealth: formData.batteryHealth,
                customerName: formData.contactInfo.name,
                customerPhone: formData.contactInfo.phone,
                customerEmail: formData.contactInfo.email,
                pickupAddress: formData.contactInfo.address,
                estimatedValue: this.calculateEstimatedValue(formData),
                status: 'New Lead'
            };

            // Create form data for Google Apps Script
            const formDataToSend = new FormData();
            formDataToSend.append('data', JSON.stringify(payload));

            const response = await fetch(this.scriptURL, {
                method: 'POST',
                body: formDataToSend
            });

            // Try to parse response, but don't fail if we can't
            try {
                const result = await response.text();
                console.log('Raw response from Google Sheets:', result);

                // Check if response is empty or not JSON
                if (!result || result.trim() === '') {
                    console.log('Empty response received, assuming success');
                    return { success: true, message: 'Form submitted successfully!' };
                }

                const jsonResult = JSON.parse(result);
                if (jsonResult.success) {
                    return { success: true, message: 'Form submitted successfully!' };
                } else {
                    console.warn('Google Sheets returned error:', jsonResult.message);
                    return { success: false, message: jsonResult.message || 'Submission failed' };
                }
            } catch (parseError) {
                // If we can't parse the response, assume success (common with no-cors)
                console.log('Response parsing failed, assuming success:', parseError);
                return { success: true, message: 'Form submitted successfully!' };
            }

        } catch (error) {
            console.error('Error submitting to Google Sheets:', error);
            return {
                success: false,
                message: 'Failed to submit form. Please try again or contact us directly.'
            };
        }
    }

    // Send contact form data to Google Sheets
    async submitContactForm(formData) {
        console.log('🔧 submitContactForm called, isDevelopment:', this.isDevelopment);

        // In development mode, simulate successful submission
        if (this.isDevelopment) {
            console.log('🔧 Development Mode - Contact Form Data:');
            console.table({
                'Name': formData.name,
                'Phone': formData.phone,
                'Email': formData.email,
                'Brand': formData.brand,
                'Model': formData.model,
                'Condition': formData.condition,
                'Service': formData.service,
                'Message': formData.message
            });

            await new Promise(resolve => setTimeout(resolve, 1000));
            return {
                success: true,
                message: '✅ Development Mode: Contact form data logged above!'
            };
        }

        // Production mode - submit to Google Sheets
        console.log('🚀 Production Mode - Submitting Contact Form to Google Sheets...');

        try {
            const payload = {
                type: 'contact_form',
                timestamp: new Date().toISOString(),
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                brand: formData.brand,
                model: formData.model,
                condition: formData.condition,
                service: formData.service,
                message: formData.message,
                status: 'New Inquiry'
            };

            // Create form data for Google Apps Script
            const formDataToSend = new FormData();
            formDataToSend.append('data', JSON.stringify(payload));

            const response = await fetch(this.scriptURL, {
                method: 'POST',
                body: formDataToSend
            });

            // Try to parse response
            try {
                const result = await response.text();
                console.log('Raw contact form response:', result);

                // Check if response is empty or not JSON
                if (!result || result.trim() === '') {
                    console.log('Empty response received, assuming success');
                    return { success: true, message: 'Contact form submitted successfully!' };
                }

                const jsonResult = JSON.parse(result);
                if (jsonResult.success) {
                    return { success: true, message: 'Contact form submitted successfully to Google Sheets!' };
                } else {
                    console.warn('Google Sheets returned error:', jsonResult.message);
                    return { success: false, message: jsonResult.message || 'Submission failed' };
                }
            } catch (parseError) {
                // If we can't parse the response, assume success
                console.log('Production mode: Contact form response received, assuming success');
                return { success: true, message: 'Contact form submitted successfully!' };
            }

        } catch (error) {
            console.error('Error submitting contact form:', error);
            return {
                success: false,
                message: 'Failed to submit form. Please try again or contact us directly at support@mobilebuyer.in'
            };
        }
    }

    // Calculate estimated phone value based on condition and model
    calculateEstimatedValue(formData) {
        const baseValues = {
            'apple': {
                'iPhone 15 Pro Max': 80000,
                'iPhone 15 Pro': 70000,
                'iPhone 15': 60000,
                'iPhone 14 Pro Max': 65000,
                'iPhone 14 Pro': 55000,
                'iPhone 14': 45000,
                'iPhone 13 Pro Max': 50000,
                'iPhone 13 Pro': 42000,
                'iPhone 13': 35000,
                'iPhone 12 Pro Max': 40000,
                'iPhone 12 Pro': 32000,
                'iPhone 12': 28000,
                'iPhone 11 Pro Max': 30000,
                'iPhone 11 Pro': 25000,
                'iPhone 11': 22000,
                'iPhone XS Max': 20000,
                'iPhone XS': 18000,
                'iPhone XR': 16000,
                'iPhone X': 15000,
                'iPhone 8 Plus': 12000,
                'iPhone 8': 10000,
                'iPhone 7 Plus': 8000,
                'iPhone 7': 6000
            },
            'samsung': {
                'Galaxy S24 Ultra': 70000,
                'Galaxy S24+': 55000,
                'Galaxy S24': 45000,
                'Galaxy S23 Ultra': 55000,
                'Galaxy S23+': 42000,
                'Galaxy S23': 35000,
                'Galaxy S22 Ultra': 45000,
                'Galaxy S22+': 32000,
                'Galaxy S22': 28000,
                'Galaxy S21 Ultra': 35000,
                'Galaxy S21+': 25000,
                'Galaxy S21': 22000,
                'Galaxy Note 20 Ultra': 30000,
                'Galaxy Note 20': 25000,
                'Galaxy A54': 18000,
                'Galaxy A34': 15000,
                'Galaxy A24': 12000,
                'Galaxy M54': 16000,
                'Galaxy M34': 13000,
                'Galaxy M14': 10000
            },
            'oneplus': {
                'OnePlus 12': 45000,
                'OnePlus 11': 35000,
                'OnePlus 10 Pro': 30000,
                'OnePlus 10T': 28000,
                'OnePlus 9 Pro': 25000,
                'OnePlus 9': 22000,
                'OnePlus 9R': 20000,
                'OnePlus 8 Pro': 18000,
                'OnePlus 8': 16000,
                'OnePlus 8T': 17000,
                'OnePlus 7 Pro': 15000,
                'OnePlus 7': 13000,
                'OnePlus 7T': 14000,
                'OnePlus Nord 3': 18000,
                'OnePlus Nord 2T': 15000,
                'OnePlus Nord CE 3': 12000
            },
            'xiaomi': {
                'Xiaomi 14': 40000,
                'Xiaomi 13 Pro': 35000,
                'Xiaomi 13': 30000,
                'Xiaomi 12 Pro': 28000,
                'Xiaomi 12': 25000,
                'Xiaomi 11T Pro': 22000,
                'Redmi Note 13 Pro+': 20000,
                'Redmi Note 13 Pro': 18000,
                'Redmi Note 13': 15000,
                'Redmi Note 12 Pro+': 16000,
                'Redmi Note 12 Pro': 14000,
                'Redmi Note 12': 12000,
                'POCO X6 Pro': 18000,
                'POCO X6': 15000,
                'POCO F5 Pro': 20000,
                'POCO F5': 17000
            },
            'oppo': {
                'Oppo Find X7 Pro': 45000,
                'Oppo Find X6 Pro': 40000,
                'Oppo Find X5 Pro': 35000,
                'Oppo Reno 11 Pro': 25000,
                'Oppo Reno 11': 22000,
                'Oppo Reno 10 Pro': 20000,
                'Oppo A79': 15000,
                'Oppo A78': 13000,
                'Oppo A58': 11000,
                'Oppo A18': 8000
            },
            'vivo': {
                'Vivo X100 Pro': 45000,
                'Vivo X90 Pro': 40000,
                'Vivo X80 Pro': 35000,
                'Vivo V30 Pro': 25000,
                'Vivo V29 Pro': 22000,
                'Vivo V27 Pro': 20000,
                'Vivo T3 Pro': 18000,
                'Vivo T2 Pro': 16000,
                'Vivo Y100': 14000
            }
        };

        const baseValue = baseValues[formData.brand]?.[formData.model] || 10000;

        // Apply condition multipliers
        const conditionMultipliers = {
            excellent: 0.75,
            good: 0.65,
            fair: 0.50,
            poor: 0.35
        };

        const screenMultipliers = {
            perfect: 1.0,
            'minor-scratches': 0.95,
            cracked: 0.80,
            damaged: 0.60
        };

        const batteryMultipliers = {
            excellent: 1.0,
            good: 0.95,
            average: 0.85,
            poor: 0.70
        };

        // Calculate estimated value
        let estimatedValue = baseValue;
        estimatedValue *= conditionMultipliers[formData.physicalCondition] || 0.5;
        estimatedValue *= screenMultipliers[formData.screenCondition] || 0.8;
        estimatedValue *= batteryMultipliers[formData.batteryHealth] || 0.8;

        // Bonus for accessories
        if (formData.hasBox) estimatedValue *= 1.05;
        if (formData.hasCharger) estimatedValue *= 1.03;

        // Age depreciation
        const currentYear = new Date().getFullYear();
        const phoneAge = currentYear - parseInt(formData.purchaseYear);
        const ageMultiplier = Math.max(0.3, 1 - (phoneAge * 0.15));
        estimatedValue *= ageMultiplier;

        return Math.round(estimatedValue);
    }

    // Send newsletter subscription
    async submitNewsletter(email) {
        try {
            const response = await fetch(this.scriptURL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'newsletter',
                    timestamp: new Date().toISOString(),
                    email: email,
                    status: 'Subscribed'
                })
            });

            if (response.ok) {
                return { success: true, message: 'Subscribed successfully!' };
            } else {
                throw new Error('Failed to subscribe');
            }
        } catch (error) {
            console.error('Error subscribing to newsletter:', error);
            return { success: false, message: 'Failed to subscribe. Please try again.' };
        }
    }
}

export default new GoogleSheetsAPI();