# 🔍 Debug Google Sheets Integration

## 🚨 **Issue: Data Sending but Sheet Empty**

The data is reaching Google Apps Script but not being written to sheets. Let's debug this step by step.

---

## 🧪 **Step 1: Test Google Apps Script Directly**

### **1. Run Test Function:**
1. Go to your Google Apps Script project
2. Select `testScript` function from dropdown
3. Click **"Run"** button
4. Check **"Execution log"** for detailed output

### **2. Check Execution Log:**
Look for these messages:
- ✅ `=== Test Script Started ===`
- ✅ `Spreadsheet name: [Your Sheet Name]`
- ✅ `Testing with sample data: {...}`
- ✅ `handleSellPhoneForm called with data: {...}`
- ✅ `Row appended successfully. New row count: 2`
- ✅ `=== Test Script Completed Successfully ===`

### **3. Check Your Google Sheet:**
After running the test:
1. Go to your Google Sheet
2. Look for new tab: **"Sell Phone Leads"**
3. Should have headers in row 1
4. Should have test data in row 2

---

## 🔧 **Step 2: Check Permissions**

### **1. Script Permissions:**
1. In Apps Script, click **"Review permissions"**
2. Allow access to Google Sheets
3. Allow access to Gmail (for notifications)

### **2. Spreadsheet Access:**
1. Ensure the script is bound to the correct spreadsheet
2. Or ensure `SpreadsheetApp.getActiveSpreadsheet()` works

---

## 📊 **Step 3: Manual Sheet Creation**

If automatic creation fails, create sheets manually:

### **1. Create "Sell Phone Leads" Sheet:**
1. In your Google Sheet, click **"+"** to add new sheet
2. Rename to: **"Sell Phone Leads"**
3. Add these headers in row 1:
   ```
   A1: Timestamp
   B1: Customer Name  
   C1: Phone
   D1: Email
   E1: Brand
   F1: Model
   G1: Purchase Year
   H1: Has Box
   I1: Has Charger
   J1: Physical Condition
   K1: Screen Condition
   L1: Battery Health
   M1: Estimated Value
   N1: Pickup Address
   O1: Status
   P1: Notes
   ```

### **2. Create "Contact Inquiries" Sheet:**
1. Add new sheet: **"Contact Inquiries"**
2. Add headers:
   ```
   A1: Timestamp
   B1: Name
   C1: Phone
   D1: Email
   E1: Brand
   F1: Model
   G1: Condition
   H1: Service
   I1: Message
   J1: Status
   ```

---

## 🔍 **Step 4: Debug Real Form Submission**

### **1. Test Form Submission:**
1. Fill out your website form
2. Submit it
3. Immediately check Apps Script execution log

### **2. Check Execution Log:**
Look for:
- ✅ `Received data: {...}`
- ✅ `handleSellPhoneForm called with data: {...}`
- ✅ `Prepared row data: [...]`
- ✅ `Row appended successfully`

### **3. Common Issues:**

#### **Issue: No execution log entries**
- **Solution**: Check if script URL is correct
- **Solution**: Redeploy the web app

#### **Issue: "Sheet not found" error**
- **Solution**: Create sheets manually (Step 3)
- **Solution**: Check sheet names match exactly

#### **Issue: "Permission denied" error**
- **Solution**: Re-authorize script permissions
- **Solution**: Check spreadsheet sharing settings

---

## 🛠️ **Step 5: Alternative Testing Method**

### **Test with Simple Data:**
```javascript
function simpleTest() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Get or create sheet
  let sheet = ss.getSheetByName('Test Sheet');
  if (!sheet) {
    sheet = ss.insertSheet('Test Sheet');
  }
  
  // Add simple data
  sheet.appendRow(['Test', 'Data', new Date()]);
  
  console.log('Simple test completed. Row count:', sheet.getLastRow());
}
```

1. Add this function to your Apps Script
2. Run it
3. Check if "Test Sheet" is created with data

---

## 📋 **Step 6: Verification Checklist**

### **Before Testing:**
- [ ] Google Apps Script is saved
- [ ] Web app is deployed with "Anyone" access
- [ ] Script has spreadsheet permissions
- [ ] Correct script URL in frontend code

### **After Testing:**
- [ ] Check Apps Script execution log
- [ ] Check Google Sheet for new tabs
- [ ] Check for data in sheets
- [ ] Check email notifications (if configured)

---

## 🚀 **Step 7: Quick Fix Commands**

### **Run These in Apps Script:**

```javascript
// 1. Check spreadsheet info
function checkSpreadsheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  console.log('Name:', ss.getName());
  console.log('ID:', ss.getId());
  console.log('Sheets:', ss.getSheets().map(s => s.getName()));
}

// 2. Force create sheets
function createSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create sell phone sheet
  let sellSheet = ss.getSheetByName('Sell Phone Leads');
  if (!sellSheet) {
    sellSheet = ss.insertSheet('Sell Phone Leads');
    console.log('Created Sell Phone Leads sheet');
  }
  
  // Create contact sheet  
  let contactSheet = ss.getSheetByName('Contact Inquiries');
  if (!contactSheet) {
    contactSheet = ss.insertSheet('Contact Inquiries');
    console.log('Created Contact Inquiries sheet');
  }
}

// 3. Test data insertion
function testDataInsertion() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Sell Phone Leads') || ss.insertSheet('Sell Phone Leads');
  
  sheet.appendRow(['Test', 'Data', new Date().toISOString()]);
  console.log('Test data added. Row count:', sheet.getLastRow());
}
```

---

## 📞 **Next Steps**

1. **Run `testScript()`** and check execution log
2. **Check your Google Sheet** for new data
3. **If still empty**, run the quick fix commands above
4. **Test real form submission** after verification

The issue is likely one of:
- Missing permissions
- Incorrect sheet names
- Script not properly deployed
- Spreadsheet access issues

Follow the steps above to identify and fix the specific issue! 🎯