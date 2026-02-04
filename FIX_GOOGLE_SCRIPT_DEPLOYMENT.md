# 🔧 Fix Google Apps Script Deployment

## 🚨 **Current Issue**
Your Google Apps Script is returning "Script function not found: doGet" which means:
1. The script isn't deployed correctly as a web app
2. The `doGet` and `doPost` functions aren't accessible
3. The deployment settings might be wrong

## ✅ **Step-by-Step Fix**

### **Step 1: Check Your Google Apps Script**
1. Go to [script.google.com](https://script.google.com)
2. Find your "MobileBuyer Form Handler" project
3. Make sure the code from `google-apps-script/Code.gs` is properly pasted
4. **Save the project** (Ctrl+S)

### **Step 2: Re-Deploy as Web App**
1. **Click "Deploy"** → "New deployment"
2. **Click the gear icon** next to "Type" and select **"Web app"**
3. **Fill in these settings**:
   - **Description**: "MobileBuyer Form Handler v2"
   - **Execute as**: "Me (your-email@gmail.com)"
   - **Who has access**: "Anyone"
4. **Click "Deploy"**
5. **Copy the new Web App URL**

### **Step 3: Test the New Deployment**
Run this command to test:
```bash
curl -X GET "YOUR_NEW_WEB_APP_URL" -H "Accept: application/json"
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "MobileBuyer.in Form Handler is running",
  "timestamp": "2024-02-04T...",
  "method": "GET"
}
```

### **Step 4: Update Your React App**
1. Open `client/src/utils/googleSheets.js`
2. Replace the old URL with your new Web App URL:
```javascript
this.scriptURL = 'YOUR_NEW_WEB_APP_URL';
```

### **Step 5: Test Form Submission**
Use this curl command to test form submission:
```bash
curl -X POST "YOUR_NEW_WEB_APP_URL" \
  -F 'data={"type": "sell_phone", "timestamp": "2024-02-04T10:30:00.000Z", "brand": "apple", "model": "iPhone 13", "purchaseYear": "2021", "hasBox": "Yes", "hasCharger": "Yes", "physicalCondition": "good", "screenCondition": "perfect", "batteryHealth": "excellent", "customerName": "Test Customer", "customerPhone": "9876543210", "customerEmail": "test@example.com", "pickupAddress": "Test Address, Mumbai", "estimatedValue": 25000, "status": "Test Lead"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Sell phone form submitted successfully",
  "rowCount": 2
}
```

## 🔍 **Common Deployment Issues**

### **Issue 1: "Script function not found"**
- **Cause**: Script not deployed as web app
- **Fix**: Follow Step 2 above

### **Issue 2: "Authorization required"**
- **Cause**: Script permissions not set correctly
- **Fix**: Set "Execute as: Me" and "Who has access: Anyone"

### **Issue 3: "Moved Temporarily" (302 redirect)**
- **Cause**: Old deployment URL or wrong settings
- **Fix**: Create new deployment with correct settings

### **Issue 4: "Server error"**
- **Cause**: Error in the script code
- **Fix**: Check Google Apps Script logs (View → Logs)

## 🧪 **Testing Checklist**

- [ ] GET request returns success message
- [ ] POST request with sell phone data works
- [ ] POST request with contact form data works
- [ ] Data appears in Google Sheets
- [ ] Email notifications are sent (if configured)

## 📝 **Current Script URL**
Your current URL: `https://script.google.com/macros/s/AKfycbwrjIiXHiFJbivTU1bNZIdoe_rNdBxeDh9TzhmCWYb9i6gD3Jq3-Xa7f0wSfhS4AeFt/exec`

**Status**: ❌ Not working (returns "Script function not found: doGet")

## 🎯 **Next Steps**
1. Follow the deployment steps above
2. Get a new Web App URL
3. Test with curl commands
4. Update your React app
5. Test the full form submission flow

Once you have the new URL, we can test it together! 🚀