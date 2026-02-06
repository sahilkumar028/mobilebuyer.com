/**
 * Combined Google Apps Script for MobileBuyer.in
 * Handles both static and dynamic phone data management
 * Includes form submissions, dynamic data loading, and email notifications
 */

// ============================================================================
// MAIN REQUEST HANDLERS
// ============================================================================

function doGet(e) {
  const action = e.parameter.action;
  
  // Set cache headers for better performance
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  
  try {
    // Handle dynamic data requests with caching
    switch(action) {
      case 'getCompanies':
        return getCompaniesOptimized();
      case 'getModels':
        return getModelsOptimized(e.parameter.company);
      case 'getStorage':
        return getStorageOptimized(e.parameter.company, e.parameter.model);
      default:
        // Default GET response for testing
        return output.setContent(JSON.stringify({
          status: 'OK', 
          message: 'MobileBuyer.in Form Handler is running',
          timestamp: new Date().toISOString(),
          availableActions: ['getCompanies', 'getModels', 'getStorage']
        }));
    }
  } catch (error) {
    console.error('Error in doGet:', error);
    return output.setContent(JSON.stringify({error: error.toString()}));
  }
}

function doPost(e) {
  // Add CORS headers
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  
  try {
    let data;
    
    // Handle different types of POST data
    if (e.postData) {
      if (e.postData.contents) {
        // Direct JSON in contents
        try {
          data = JSON.parse(e.postData.contents);
        } catch (parseError) {
          console.error('Error parsing JSON from contents:', parseError);
        }
      } else if (e.parameter && e.parameter.data) {
        // FormData with 'data' parameter (single value)
        try {
          data = JSON.parse(e.parameter.data);
        } catch (parseError) {
          console.error('Error parsing JSON from parameter:', parseError);
        }
      }
    }
    
    // If we still don't have data, try parameters (plural) - FormData arrays
    if (!data && e.parameters && e.parameters.data) {
      try {
        // FormData sends arrays, so take the first element
        const jsonString = Array.isArray(e.parameters.data) ? e.parameters.data[0] : e.parameters.data;
        data = JSON.parse(jsonString);
        console.log('Successfully parsed data from parameters array:', JSON.stringify(data));
      } catch (parseError) {
        console.error('Error parsing JSON from parameters array:', parseError);
        console.error('Raw parameters.data:', e.parameters.data);
      }
    }
    
    // Final fallback - check if we have any data at all
    if (!data) {
      console.error('No data found in request. Full request object:', JSON.stringify(e));
      return output.setContent(JSON.stringify({
        success: false, 
        message: 'No data received. Request details logged.',
        debug: {
          hasPostData: !!e.postData,
          hasParameters: !!e.parameters,
          hasParameter: !!e.parameter
        }
      }));
    }

    // Log received data for debugging
    console.log('Received data:', JSON.stringify(data));
    
    // Route to appropriate handler based on form type
    let result;
    switch(data.type) {
      case 'sell_phone':
        result = handleSellPhoneSubmission(data);
        break;
      case 'contact_form':
        result = handleContactForm(data);
        break;
      case 'newsletter':
        result = handleNewsletter(data);
        break;
      default:
        result = {
          success: false, 
          message: 'Unknown form type: ' + (data.type || 'undefined'),
          receivedData: data
        };
    }
    
    console.log('Returning result:', JSON.stringify(result));
    return output.setContent(JSON.stringify(result));
    
  } catch (error) {
    console.error('Error processing form:', error);
    return output.setContent(JSON.stringify({
      success: false, 
      message: 'Server error: ' + error.toString(),
      stack: error.stack
    }));
  }
}

// ============================================================================
// OPTIMIZED DYNAMIC DATA LOADING FUNCTIONS
// ============================================================================

// Cache for sheet data to avoid repeated reads
let sheetDataCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get cached sheet data or read from sheet
 */
function getCachedSheetData() {
  const now = new Date().getTime();
  
  // Return cached data if still valid
  if (sheetDataCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
    return sheetDataCache;
  }
  
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Phone_Data');
    if (!sheet) {
      return null;
    }
    
    const data = sheet.getDataRange().getValues();
    sheetDataCache = data;
    cacheTimestamp = now;
    
    return data;
  } catch (error) {
    console.error('Error reading sheet data:', error);
    return null;
  }
}

/**
 * Optimized get companies with logos and caching
 */
function getCompaniesOptimized() {
  try {
    const data = getCachedSheetData();
    
    if (!data) {
      // Fallback to static data with logos
      const staticCompanies = getStaticCompaniesWithLogos();
      return ContentService
        .createTextOutput(JSON.stringify(staticCompanies))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const companiesMap = new Map();
    
    // Skip header row (index 0)
    for (let i = 1; i < data.length; i++) {
      if (data[i][0]) { // Column A - Company
        const company = data[i][0];
        const logo = data[i][5] || getDefaultLogo(company); // Column F - Logo URL
        
        if (!companiesMap.has(company)) {
          companiesMap.set(company, {
            name: company,
            logo: logo
          });
        }
      }
    }
    
    const companiesList = Array.from(companiesMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    
    return ContentService
      .createTextOutput(JSON.stringify(companiesList))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error getting companies:', error);
    // Return static fallback data with logos
    const fallbackCompanies = getStaticCompaniesWithLogos();
    return ContentService
      .createTextOutput(JSON.stringify(fallbackCompanies))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optimized get models with caching
 */
function getModelsOptimized(company) {
  try {
    if (!company) {
      throw new Error('Company parameter is required');
    }
    
    const data = getCachedSheetData();
    
    if (!data) {
      // Fallback to static data
      const staticModels = getStaticModelsServer(company);
      return ContentService
        .createTextOutput(JSON.stringify(staticModels))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const models = new Set();
    
    // Skip header row (index 0)
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === company && data[i][1]) { // Column A - Company, Column B - Model
        models.add(data[i][1]);
      }
    }
    
    const modelsList = Array.from(models).sort();
    
    return ContentService
      .createTextOutput(JSON.stringify(modelsList))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error getting models:', error);
    const fallbackModels = getStaticModelsServer(company);
    return ContentService
      .createTextOutput(JSON.stringify(fallbackModels))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optimized get storage with caching
 */
function getStorageOptimized(company, model) {
  try {
    if (!company || !model) {
      throw new Error('Company and model parameters are required');
    }
    
    const data = getCachedSheetData();
    
    if (!data) {
      // Fallback to static data
      const staticStorage = getStaticStorageServer(company, model);
      return ContentService
        .createTextOutput(JSON.stringify(staticStorage))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const storageOptions = new Set();
    
    // Skip header row (index 0)
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === company && data[i][1] === model && data[i][2]) { 
        // Column A - Company, Column B - Model, Column C - Storage
        storageOptions.add(data[i][2]);
      }
    }
    
    const storageList = Array.from(storageOptions).sort();
    
    return ContentService
      .createTextOutput(JSON.stringify(storageList))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error getting storage options:', error);
    const fallbackStorage = getStaticStorageServer(company, model);
    return ContentService
      .createTextOutput(JSON.stringify(fallbackStorage))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================================
// STATIC DATA FALLBACKS
// ============================================================================

/**
 * Get static companies with logos for fallback
 */
function getStaticCompaniesWithLogos() {
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
    },
    {
      name: 'Realme',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/realme.svg'
    },
    {
      name: 'Nothing',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/nothing.svg'
    }
  ];
}

/**
 * Get default logo URL for a company
 */
function getDefaultLogo(company) {
  const logoMap = {
    'Apple': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/apple.svg',
    'Samsung': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/samsung.svg',
    'OnePlus': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/oneplus.svg',
    'Xiaomi': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/xiaomi.svg',
    'Oppo': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/oppo.svg',
    'Vivo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Vivo_Logo.svg/200px-Vivo_Logo.svg.png',
    'Realme': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/realme.svg',
    'Nothing': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/nothing.svg',
    'Google': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/google.svg',
    'Motorola': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/motorola.svg',
    'Nokia': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/nokia.svg',
    'Honor': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/honor.svg'
  };
  
  return logoMap[company] || 'https://via.placeholder.com/40x40/cccccc/666666?text=' + company.charAt(0);
}
  const staticData = {
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
}

function getStaticStorageServer(company, model) {
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
}

// ============================================================================
// FORM SUBMISSION HANDLERS
// ============================================================================

/**
 * Handle sell phone form submission with dynamic pricing
 */
function handleSellPhoneSubmission(data) {
  try {
    // Calculate estimated value using dynamic or static data
    const estimatedValue = calculateEstimatedValue(
      data.company || data.brand,
      data.model,
      data.storage,
      data.phoneAgeMonths,
      data.physicalCondition,
      data.screenCondition,
      data.batteryHealth,
      data.hasBox,
      data.hasCharger
    );
    
    // Get or create the leads sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Sell_Phone_Leads');
    
    if (!sheet) {
      sheet = ss.insertSheet('Sell_Phone_Leads');
      // Add headers
      sheet.getRange(1, 1, 1, 15).setValues([[
        'Timestamp', 'Customer Name', 'Phone', 'Email', 'Company', 'Model', 
        'Storage', 'Phone Age (Months)', 'Has Box', 'Has Charger', 'Physical Condition', 
        'Screen Condition', 'Battery Health', 'Estimated Value', 'Pickup Address'
      ]]);
      
      // Format headers
      sheet.getRange(1, 1, 1, 15).setBackground('#4285f4').setFontColor('white').setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    
    // Add the new lead
    sheet.appendRow([
      new Date(),
      data.customerName || 'N/A',
      data.customerPhone || 'N/A',
      data.customerEmail || 'N/A',
      data.company || data.brand || 'N/A',
      data.model || 'N/A',
      data.storage || 'N/A',
      data.phoneAgeMonths || 'N/A',
      data.hasBox || 'No',
      data.hasCharger || 'No',
      data.physicalCondition || 'N/A',
      data.screenCondition || 'N/A',
      data.batteryHealth || 'N/A',
      '₹' + estimatedValue,
      data.pickupAddress || 'N/A'
    ]);
    
    // Send email notification
    sendEmailNotification('sell_phone', data, estimatedValue);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Form submitted successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error handling sell phone submission:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle contact form submission
 */
function handleContactForm(data) {
  try {
    console.log('handleContactForm called with data:', JSON.stringify(data));
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    // Get or create "Contact Inquiries" sheet
    let sheet = ss.getSheetByName('Contact Inquiries');
    if (!sheet) {
      console.log('Creating new "Contact Inquiries" sheet');
      sheet = ss.insertSheet('Contact Inquiries');
      // Add headers
      sheet.getRange(1, 1, 1, 10).setValues([[
        'Timestamp', 'Name', 'Phone', 'Email', 'Brand', 'Model', 
        'Condition', 'Service', 'Message', 'Status'
      ]]);
      
      // Format headers
      sheet.getRange(1, 1, 1, 10).setBackground('#34a853').setFontColor('white').setFontWeight('bold');
      sheet.setFrozenRows(1);
      console.log('Headers added to new sheet');
    } else {
      console.log('Using existing "Contact Inquiries" sheet');
    }
    
    // Prepare row data - using correct field names from contact form
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.customerName || data.name || 'N/A',
      data.customerPhone || data.phone || 'N/A',
      data.customerEmail || data.email || 'N/A',
      data.phoneBrand || data.brand || 'N/A',
      data.phoneModel || data.model || 'N/A',
      data.phoneCondition || data.condition || 'N/A',
      data.serviceRequired || data.service || 'N/A',
      data.message || 'N/A',
      data.status || 'New Inquiry'
    ];
    
    console.log('Prepared contact row data:', JSON.stringify(rowData));
    
    // Add new row with contact data
    const result = sheet.appendRow(rowData);
    console.log('Contact row appended successfully. New row count:', sheet.getLastRow());
    
    // Send email notification
    try {
      sendEmailNotification('contact_form', data);
      console.log('Contact email notification sent');
    } catch (emailError) {
      console.error('Contact email notification failed:', emailError);
    }
    
    return {success: true, message: 'Contact form submitted successfully', rowCount: sheet.getLastRow()};
      
  } catch (error) {
    console.error('Error handling contact form:', error);
    return {success: false, message: 'Failed to save contact data: ' + error.toString()};
  }
}

/**
 * Handle newsletter subscription
 */
function handleNewsletter(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    // Get or create "Newsletter Subscribers" sheet
    let sheet = ss.getSheetByName('Newsletter Subscribers');
    if (!sheet) {
      sheet = ss.insertSheet('Newsletter Subscribers');
      // Add headers
      sheet.getRange(1, 1, 1, 3).setValues([['Timestamp', 'Email', 'Status']]);
      
      // Format headers
      sheet.getRange(1, 1, 1, 3).setBackground('#ea4335').setFontColor('white').setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    
    // Check if email already exists
    const emailColumn = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues();
    const emailExists = emailColumn.some(row => row[0] === data.email);
    
    if (!emailExists) {
      // Add new subscriber
      sheet.appendRow([
        data.timestamp,
        data.email,
        data.status
      ]);
    }
    
    return {success: true, message: 'Newsletter subscription successful'};
      
  } catch (error) {
    console.error('Error handling newsletter:', error);
    return {success: false, message: 'Failed to subscribe: ' + error.toString()};
  }
}

// ============================================================================
// PRICING CALCULATION
// ============================================================================

/**
 * Calculate estimated value based on phone data and condition
 */
function calculateEstimatedValue(company, model, storage, phoneAgeMonths, physicalCondition, screenCondition, batteryHealth, hasBox, hasCharger) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Phone_Data');
    let basePrice = 15000; // Default fallback
    
    if (sheet) {
      // Try to get price from dynamic data
      const data = sheet.getDataRange().getValues();
      
      // Find the base price for this specific phone configuration
      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === company && data[i][1] === model && data[i][2] === storage) {
          basePrice = data[i][3] || 15000; // Column D - Base_Price
          break;
        }
      }
    } else {
      // Use static pricing if no sheet exists
      basePrice = getStaticBasePrice(company, model, storage);
    }
    
    // Apply condition multipliers
    const conditionMultipliers = {
      excellent: 0.75,
      good: 0.65,
      fair: 0.50,
      poor: 0.35
    };
    
    const screenMultipliers = {
      perfect: 1.0,
      'minor-scratches': 0.9,
      cracked: 0.7,
      damaged: 0.5
    };
    
    const batteryMultipliers = {
      excellent: 1.0,
      good: 0.9,
      average: 0.8,
      poor: 0.6
    };
    
    let estimatedValue = basePrice;
    estimatedValue *= conditionMultipliers[physicalCondition] || 0.5;
    estimatedValue *= screenMultipliers[screenCondition] || 0.8;
    estimatedValue *= batteryMultipliers[batteryHealth] || 0.8;
    
    // Bonus for accessories
    if (hasBox === 'Yes') estimatedValue *= 1.05;
    if (hasCharger === 'Yes') estimatedValue *= 1.03;
    
    // Age depreciation
    const phoneAgeInYears = parseInt(phoneAgeMonths) / 12;
    const ageMultiplier = Math.max(0.3, 1 - (phoneAgeInYears * 0.15));
    estimatedValue *= ageMultiplier;
    
    return Math.round(estimatedValue);
    
  } catch (error) {
    console.error('Error calculating estimated value:', error);
    return 15000; // Fallback value
  }
}

/**
 * Static base price fallback
 */
function getStaticBasePrice(company, model, storage) {
  const staticPrices = {
    'Apple': {
      'iPhone 15 Pro Max': { '128GB': 80000, '256GB': 85000, '512GB': 95000, '1TB': 105000 },
      'iPhone 15 Pro': { '128GB': 70000, '256GB': 75000, '512GB': 85000, '1TB': 95000 },
      'iPhone 15': { '128GB': 60000, '256GB': 65000, '512GB': 75000 },
      'iPhone 14 Pro Max': { '128GB': 65000, '256GB': 70000, '512GB': 80000, '1TB': 90000 },
      'iPhone 13 Pro': { '128GB': 42000, '256GB': 47000, '512GB': 55000, '1TB': 65000 },
      'iPhone 13': { '128GB': 35000, '256GB': 40000, '512GB': 48000 },
      'iPhone 12': { '64GB': 28000, '128GB': 32000, '256GB': 38000 }
    },
    'Samsung': {
      'Galaxy S24 Ultra': { '256GB': 70000, '512GB': 80000, '1TB': 90000 },
      'Galaxy S23 Ultra': { '256GB': 55000, '512GB': 65000, '1TB': 75000 },
      'Galaxy S22 Ultra': { '128GB': 45000, '256GB': 50000, '512GB': 60000 }
    }
  };
  
  return staticPrices[company]?.[model]?.[storage] || 15000;
}

// ============================================================================
// EMAIL NOTIFICATIONS
// ============================================================================

/**
 * Send email notification for new submissions
 */
function sendEmailNotification(type, data, estimatedValue) {
  try {
    // Replace with your email address
    const emailAddress = 'your-email@example.com';
    
    let subject, body;
    
    if (type === 'sell_phone') {
      subject = `New Phone Selling Inquiry - ${data.company || data.brand} ${data.model}`;
      body = `
New phone selling inquiry:

Customer: ${data.customerName}
Phone: ${data.customerPhone}
Email: ${data.customerEmail}

Phone Details:
Company: ${data.company || data.brand}
Model: ${data.model}
Storage: ${data.storage || 'N/A'}
Age: ${data.phoneAgeMonths} months old
Estimated Value: ₹${estimatedValue}

Condition:
Physical: ${data.physicalCondition}
Screen: ${data.screenCondition}
Battery: ${data.batteryHealth}

Accessories:
Box: ${data.hasBox}
Charger: ${data.hasCharger}

Pickup Address:
${data.pickupAddress}

Please contact the customer within 2 hours with your quote.
      `;
    } else if (type === 'contact_form') {
      subject = `New Contact Inquiry - ${data.serviceRequired || data.service}`;
      body = `
New contact form submission:

Name: ${data.customerName || data.name}
Phone: ${data.customerPhone || data.phone}
Email: ${data.customerEmail || data.email}
Service: ${data.serviceRequired || data.service}

Phone Details:
Brand: ${data.phoneBrand || data.brand}
Model: ${data.phoneModel || data.model}
Condition: ${data.phoneCondition || data.condition}

Message:
${data.message}
      `;
    }
    
    // Send email notification
    MailApp.sendEmail(emailAddress, subject, body);
    
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// ============================================================================
// TESTING AND UTILITY FUNCTIONS
// ============================================================================

/**
 * Test the dynamic system
 */
function testDynamicSystem() {
  console.log('=== Testing Dynamic System ===');
  
  try {
    console.log('Testing Companies:', getCompanies().getContent());
    console.log('Testing Models for Apple:', getModels('Apple').getContent());
    console.log('Testing Storage for iPhone 15 Pro Max:', getStorage('Apple', 'iPhone 15 Pro Max').getContent());
    
    // Test form submission
    const testData = {
      type: 'sell_phone',
      company: 'Apple',
      model: 'iPhone 15 Pro Max',
      storage: '256GB',
      phoneAgeMonths: '12',
      physicalCondition: 'excellent',
      screenCondition: 'perfect',
      batteryHealth: 'excellent',
      hasBox: 'Yes',
      hasCharger: 'Yes',
      customerName: 'Test User',
      customerPhone: '9999999999',
      customerEmail: 'test@example.com',
      pickupAddress: 'Test Address'
    };
    
    console.log('Testing form submission:', handleSellPhoneSubmission(testData));
    console.log('=== Test Complete ===');
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

/**
 * Get form statistics
 */
function getFormStats() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const sellPhoneSheet = ss.getSheetByName('Sell_Phone_Leads');
  const contactSheet = ss.getSheetByName('Contact Inquiries');
  const newsletterSheet = ss.getSheetByName('Newsletter Subscribers');
  
  const stats = {
    sellPhoneLeads: sellPhoneSheet ? sellPhoneSheet.getLastRow() - 1 : 0,
    contactInquiries: contactSheet ? contactSheet.getLastRow() - 1 : 0,
    newsletterSubscribers: newsletterSheet ? newsletterSheet.getLastRow() - 1 : 0,
    timestamp: new Date().toISOString()
  };
  
  console.log('Form Statistics:', stats);
  return stats;
}

/**
 * Initialize sheets with proper structure including logos
 */
function initializeSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create Phone_Data sheet if it doesn't exist
  let phoneDataSheet = ss.getSheetByName('Phone_Data');
  if (!phoneDataSheet) {
    phoneDataSheet = ss.insertSheet('Phone_Data');
    phoneDataSheet.getRange(1, 1, 1, 6).setValues([[
      'Company', 'Model', 'Storage', 'Base_Price', 'Condition_Multiplier', 'Logo_URL'
    ]]);
    phoneDataSheet.getRange(1, 1, 1, 6).setBackground('#ff9900').setFontColor('white').setFontWeight('bold');
    
    // Add sample data with logos
    phoneDataSheet.getRange(2, 1, 6, 6).setValues([
      ['Apple', 'iPhone 15 Pro Max', '256GB', 85000, 1.0, 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/apple.svg'],
      ['Apple', 'iPhone 15 Pro Max', '512GB', 95000, 1.0, 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/apple.svg'],
      ['Samsung', 'Galaxy S24 Ultra', '256GB', 70000, 1.0, 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/samsung.svg'],
      ['Samsung', 'Galaxy S24 Ultra', '512GB', 80000, 1.0, 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/samsung.svg'],
      ['OnePlus', 'OnePlus 12', '256GB', 45000, 1.0, 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/oneplus.svg'],
      ['Xiaomi', 'Xiaomi 14', '256GB', 40000, 1.0, 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/xiaomi.svg']
    ]);
    
    // Auto-resize columns
    phoneDataSheet.autoResizeColumns(1, 6);
  }
  
  console.log('Sheets initialized successfully with logo support');
}