// Google Apps Script for MobileBuyer.in Form Submissions
// This script receives form data and saves it to Google Sheets

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
    
    // Get the active spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Route to appropriate sheet based on form type
    let result;
    switch(data.type) {
      case 'sell_phone':
        result = handleSellPhoneForm(ss, data);
        break;
      case 'contact_form':
        result = handleContactForm(ss, data);
        break;
      case 'newsletter':
        result = handleNewsletter(ss, data);
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

function doGet(e) {
  // Handle GET requests for CORS preflight and testing
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  
  // Log the request for debugging
  console.log('GET request received:', e);
  
  return output.setContent(JSON.stringify({
    status: 'OK', 
    message: 'MobileBuyer.in Form Handler is running',
    timestamp: new Date().toISOString(),
    method: 'GET'
  }));
}

function handleSellPhoneForm(ss, data) {
  try {
    console.log('handleSellPhoneForm called with data:', JSON.stringify(data));
    
    // Get or create "Sell Phone Leads" sheet
    let sheet = ss.getSheetByName('Sell Phone Leads');
    if (!sheet) {
      console.log('Creating new "Sell Phone Leads" sheet');
      sheet = ss.insertSheet('Sell Phone Leads');
      // Add headers
      sheet.getRange(1, 1, 1, 16).setValues([[
        'Timestamp', 'Customer Name', 'Phone', 'Email', 'Brand', 'Model', 
        'Purchase Year', 'Has Box', 'Has Charger', 'Physical Condition', 
        'Screen Condition', 'Battery Health', 'Estimated Value', 'Pickup Address', 
        'Status', 'Notes'
      ]]);
      
      // Format headers
      sheet.getRange(1, 1, 1, 16).setBackground('#4285f4').setFontColor('white').setFontWeight('bold');
      sheet.setFrozenRows(1);
      console.log('Headers added to new sheet');
    } else {
      console.log('Using existing "Sell Phone Leads" sheet');
    }
    
    // Prepare row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.customerName || 'N/A',
      data.customerPhone || 'N/A',
      data.customerEmail || 'N/A',
      data.brand || 'N/A',
      data.model || 'N/A',
      data.purchaseYear || 'N/A',
      data.hasBox || 'N/A',
      data.hasCharger || 'N/A',
      data.physicalCondition || 'N/A',
      data.screenCondition || 'N/A',
      data.batteryHealth || 'N/A',
      '₹' + (data.estimatedValue || '0'),
      data.pickupAddress || 'N/A',
      data.status || 'New Lead',
      '' // Notes column for manual entry
    ];
    
    console.log('Prepared row data:', JSON.stringify(rowData));
    
    // Add new row with form data
    const result = sheet.appendRow(rowData);
    console.log('Row appended successfully. New row count:', sheet.getLastRow());
    
    // Send email notification (optional)
    try {
      sendEmailNotification('sell_phone', data);
      console.log('Email notification sent');
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the whole operation if email fails
    }
    
    return {success: true, message: 'Sell phone form submitted successfully', rowCount: sheet.getLastRow()};
      
  } catch (error) {
    console.error('Error handling sell phone form:', error);
    return {success: false, message: 'Failed to save sell phone data: ' + error.toString()};
  }
}

function handleContactForm(ss, data) {
  try {
    console.log('handleContactForm called with data:', JSON.stringify(data));
    
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
    
    // Prepare row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.name || 'N/A',
      data.phone || 'N/A',
      data.email || 'N/A',
      data.brand || 'N/A',
      data.model || 'N/A',
      data.condition || 'N/A',
      data.service || 'N/A',
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

function handleNewsletter(ss, data) {
  try {
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

function sendEmailNotification(type, data) {
  try {
    // Replace with your email address
    const adminEmail = 'admin@mobilebuyer.in';
    
    let subject, body;
    
    if (type === 'sell_phone') {
      subject = `New Phone Sale Lead - ${data.brand} ${data.model}`;
      body = `
        New phone sale inquiry received:
        
        Customer Details:
        Name: ${data.customerName}
        Phone: ${data.customerPhone}
        Email: ${data.customerEmail}
        
        Phone Details:
        Brand: ${data.brand}
        Model: ${data.model}
        Year: ${data.purchaseYear}
        Estimated Value: ₹${data.estimatedValue}
        
        Condition:
        Physical: ${data.physicalCondition}
        Screen: ${data.screenCondition}
        Battery: ${data.batteryHealth}
        
        Accessories:
        Original Box: ${data.hasBox}
        Original Charger: ${data.hasCharger}
        
        Pickup Address:
        ${data.pickupAddress}
        
        Please contact the customer within 24 hours.
      `;
    } else if (type === 'contact_form') {
      subject = `New Contact Inquiry - ${data.service}`;
      body = `
        New contact form submission:
        
        Name: ${data.name}
        Phone: ${data.phone}
        Email: ${data.email}
        Service: ${data.service}
        
        Phone Details:
        Brand: ${data.brand}
        Model: ${data.model}
        Condition: ${data.condition}
        
        Message:
        ${data.message}
      `;
    }
    
    // Send email notification
    MailApp.sendEmail({
      to: adminEmail,
      subject: subject,
      body: body
    });
    
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}

// Function to get form statistics (optional)
function getFormStats() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const sellPhoneSheet = ss.getSheetByName('Sell Phone Leads');
  const contactSheet = ss.getSheetByName('Contact Inquiries');
  const newsletterSheet = ss.getSheetByName('Newsletter Subscribers');
  
  const stats = {
    sellPhoneLeads: sellPhoneSheet ? sellPhoneSheet.getLastRow() - 1 : 0,
    contactInquiries: contactSheet ? contactSheet.getLastRow() - 1 : 0,
    newsletterSubscribers: newsletterSheet ? newsletterSheet.getLastRow() - 1 : 0
  };
  
  return stats;
}

// Function to export data as CSV (optional)
function exportToCSV(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    return 'Sheet not found';
  }
  
  const data = sheet.getDataRange().getValues();
  let csv = '';
  
  data.forEach(row => {
    csv += row.join(',') + '\n';
  });
  
  return csv;
}

// Test function to verify the script is working
function testScript() {
  console.log('=== Test Script Started ===');
  
  try {
    // Test creating a sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    console.log('Spreadsheet name:', ss.getName());
    console.log('Spreadsheet ID:', ss.getId());
    
    // Test sample data with all required fields
    const sampleData = {
      type: 'sell_phone',
      timestamp: new Date().toISOString(),
      brand: 'apple',
      model: 'iPhone 13',
      purchaseYear: '2021',
      hasBox: 'Yes',
      hasCharger: 'Yes',
      physicalCondition: 'good',
      screenCondition: 'perfect',
      batteryHealth: 'excellent',
      customerName: 'Test User',
      customerPhone: '9999999999',
      customerEmail: 'test@example.com',
      pickupAddress: 'Test Address, Mumbai',
      estimatedValue: 25000,
      status: 'Test Lead'
    };
    
    console.log('Testing with sample data:', JSON.stringify(sampleData));
    
    const result = handleSellPhoneForm(ss, sampleData);
    console.log('Test result:', JSON.stringify(result));
    
    // Check if sheet was created and has data
    const sheet = ss.getSheetByName('Sell Phone Leads');
    if (sheet) {
      console.log('Sheet exists. Row count:', sheet.getLastRow());
      console.log('Column count:', sheet.getLastColumn());
      
      // Get the data to verify
      if (sheet.getLastRow() > 1) {
        const lastRow = sheet.getRange(sheet.getLastRow(), 1, 1, sheet.getLastColumn()).getValues()[0];
        console.log('Last row data:', lastRow);
      }
    } else {
      console.log('Sheet was not created!');
    }
    
    console.log('=== Test Script Completed Successfully ===');
    return result;
    
  } catch (error) {
    console.error('Test script failed:', error);
    return {success: false, message: 'Test failed: ' + error.toString()};
  }
}

// Function to manually test form submission
function testFormSubmission() {
  // Simulate a form submission
  const mockEvent = {
    parameter: {
      data: JSON.stringify({
        type: 'sell_phone',
        timestamp: new Date().toISOString(),
        brand: 'apple',
        model: 'iPhone 13',
        purchaseYear: '2021',
        hasBox: 'Yes',
        hasCharger: 'Yes',
        physicalCondition: 'good',
        screenCondition: 'perfect',
        batteryHealth: 'excellent',
        customerName: 'Test Customer',
        customerPhone: '9876543210',
        customerEmail: 'test@mobilebuyer.in',
        pickupAddress: 'Test Address, Mumbai',
        estimatedValue: 25000,
        status: 'Test Lead'
      })
    }
  };
  
  return doPost(mockEvent);
}