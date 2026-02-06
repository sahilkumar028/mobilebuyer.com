/**
 * Dynamic Phone Data Management System
 * This script handles dynamic loading of phone data from Google Sheets
 */

function doGet(e) {
  const action = e.parameter.action;
  
  try {
    switch(action) {
      case 'getCompanies':
        return getCompanies();
      case 'getModels':
        return getModels(e.parameter.company);
      case 'getStorage':
        return getStorage(e.parameter.company, e.parameter.model);
      default:
        return ContentService
          .createTextOutput(JSON.stringify({error: 'Invalid action'}))
          .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    console.error('Error in doGet:', error);
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.parameter.data || e.postData.contents);
    
    if (data.type === 'sell_phone') {
      return handleSellPhoneSubmission(data);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({error: 'Invalid request type'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get all unique companies from Phone_Data sheet
 */
function getCompanies() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Phone_Data');
    
    if (!sheet) {
      throw new Error('Phone_Data sheet not found');
    }
    
    const data = sheet.getDataRange().getValues();
    const companies = new Set();
    
    // Skip header row (index 0)
    for (let i = 1; i < data.length; i++) {
      if (data[i][0]) { // Column A - Company
        companies.add(data[i][0]);
      }
    }
    
    const companiesList = Array.from(companies).sort();
    
    return ContentService
      .createTextOutput(JSON.stringify(companiesList))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error getting companies:', error);
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get all models for a specific company
 */
function getModels(company) {
  try {
    if (!company) {
      throw new Error('Company parameter is required');
    }
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Phone_Data');
    
    if (!sheet) {
      throw new Error('Phone_Data sheet not found');
    }
    
    const data = sheet.getDataRange().getValues();
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
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get all storage options for a specific company and model
 */
function getStorage(company, model) {
  try {
    if (!company || !model) {
      throw new Error('Company and model parameters are required');
    }
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Phone_Data');
    
    if (!sheet) {
      throw new Error('Phone_Data sheet not found');
    }
    
    const data = sheet.getDataRange().getValues();
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
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Calculate estimated value based on phone data and condition
 */
function calculateEstimatedValue(company, model, storage, phoneAgeMonths, physicalCondition, screenCondition, batteryHealth, hasBox, hasCharger) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Phone_Data');
    
    if (!sheet) {
      console.error('Phone_Data sheet not found');
      return 15000; // Default fallback value
    }
    
    const data = sheet.getDataRange().getValues();
    let basePrice = 15000; // Default fallback
    
    // Find the base price for this specific phone configuration
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === company && data[i][1] === model && data[i][2] === storage) {
        basePrice = data[i][3] || 15000; // Column D - Base_Price
        break;
      }
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
 * Handle sell phone form submission
 */
function handleSellPhoneSubmission(data) {
  try {
    // Calculate estimated value (for backend use only)
    const estimatedValue = calculateEstimatedValue(
      data.company,
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
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sell_Phone_Leads');
    
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Sell_Phone_Leads');
      // Add headers
      sheet.getRange(1, 1, 1, 15).setValues([[
        'Timestamp', 'Customer Name', 'Phone', 'Email', 'Company', 'Model', 
        'Storage', 'Phone Age (Months)', 'Has Box', 'Has Charger', 'Physical Condition', 
        'Screen Condition', 'Battery Health', 'Estimated Value', 'Pickup Address'
      ]]);
    }
    
    // Add the new lead
    sheet.appendRow([
      new Date(),
      data.customerName || 'N/A',
      data.customerPhone || 'N/A',
      data.customerEmail || 'N/A',
      data.company || 'N/A',
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
    sendEmailNotification(data, estimatedValue);
    
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
 * Send email notification for new lead
 */
function sendEmailNotification(data, estimatedValue) {
  try {
    const subject = `New Phone Selling Inquiry - ${data.company} ${data.model}`;
    const body = `
New phone selling inquiry:

Customer: ${data.customerName}
Phone: ${data.customerPhone}
Email: ${data.customerEmail}

Phone Details:
Company: ${data.company}
Model: ${data.model}
Storage: ${data.storage}
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
    
    // Replace with your email
    const emailAddress = 'your-email@example.com';
    MailApp.sendEmail(emailAddress, subject, body);
    
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

/**
 * Test function to verify the setup
 */
function testDynamicSystem() {
  console.log('Testing Companies:', getCompanies().getContent());
  console.log('Testing Models for Apple:', getModels('Apple').getContent());
  console.log('Testing Storage for iPhone 15 Pro Max:', getStorage('Apple', 'iPhone 15 Pro Max').getContent());
}