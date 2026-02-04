# 📊 Google Sheets Integration Setup for MobileBuyer.in

## 🎯 **What This Does**
- All form submissions automatically go to Google Sheets
- No backend server needed
- Real-time data collection
- Email notifications for new leads
- Automatic phone value estimation

---

## 🚀 **Step-by-Step Setup**

### **Step 1: Create Google Sheet**

1. **Go to Google Sheets**: [sheets.google.com](https://sheets.google.com)
2. **Create a new spreadsheet**
3. **Rename it**: "MobileBuyer.in - Lead Management"
4. **Note the Spreadsheet ID** from URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   ```

### **Step 2: Set Up Google Apps Script**

1. **In your Google Sheet, go to**: Extensions → Apps Script
2. **Delete the default code** in `Code.gs`
3. **Copy and paste** the entire content from `google-apps-script/Code.gs`
4. **Save the project** (Ctrl+S)
5. **Rename project**: "MobileBuyer Form Handler"

### **Step 3: Deploy as Web App**

1. **Click "Deploy"** → New Deployment
2. **Type**: Web app
3. **Description**: "MobileBuyer Form Handler"
4. **Execute as**: Me
5. **Who has access**: Anyone
6. **Click "Deploy"**
7. **Copy the Web App URL** (looks like):
   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

### **Step 4: Update Your React App**

1. **Open**: `client/src/utils/googleSheets.js`
2. **Replace** `YOUR_SCRIPT_ID` with your actual script ID:
   ```javascript
   this.scriptURL = 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec';
   ```
3. **Save the file**

### **Step 5: Update Email Notifications (Optional)**

1. **In Google Apps Script**, find this line:
   ```javascript
   const adminEmail = 'admin@mobilebuyer.in';
   ```
2. **Replace with your actual email**:
   ```javascript
   const adminEmail = 'your-email@gmail.com';
   ```

---

## 📋 **What Gets Collected**

### **Sell Phone Form Data:**
- Customer name, phone, email
- Phone brand, model, purchase year
- Condition assessment (physical, screen, battery)
- Accessories (box, charger)
- Pickup address
- **Automatic price estimation**
- Timestamp and status

### **Contact Form Data:**
- Customer details
- Phone information
- Service required
- Message/inquiry
- Timestamp

### **Newsletter Subscriptions:**
- Email addresses
- Subscription timestamp

---

## 📊 **Google Sheets Structure**

### **Sheet 1: "Sell Phone Leads"**
| Column | Data |
|--------|------|
| A | Timestamp |
| B | Customer Name |
| C | Phone Number |
| D | Email |
| E | Brand |
| F | Model |
| G | Purchase Year |
| H | Has Box |
| I | Has Charger |
| J | Physical Condition |
| K | Screen Condition |
| L | Battery Health |
| M | Estimated Value |
| N | Pickup Address |
| O | Status |
| P | Notes |

### **Sheet 2: "Contact Inquiries"**
| Column | Data |
|--------|------|
| A | Timestamp |
| B | Name |
| C | Phone |
| D | Email |
| E | Brand |
| F | Model |
| G | Condition |
| H | Service |
| I | Message |
| J | Status |

### **Sheet 3: "Newsletter Subscribers"**
| Column | Data |
|--------|------|
| A | Timestamp |
| B | Email |
| C | Status |

---

## 🔧 **Advanced Features**

### **1. Automatic Price Estimation**
The system calculates phone values based on:
- **Base market value** by brand/model
- **Condition multipliers** (excellent: 75%, good: 65%, etc.)
- **Screen condition** impact
- **Battery health** factor
- **Age depreciation** (15% per year)
- **Accessories bonus** (box: +5%, charger: +3%)

### **2. Email Notifications**
Automatic emails sent to admin for:
- New phone sale leads
- Contact form submissions
- Include all customer details and phone information

### **3. Data Validation**
- Prevents duplicate newsletter subscriptions
- Validates required fields
- Error handling and user feedback

---

## 📱 **Testing the Integration**

### **1. Test Sell Phone Form:**
1. Go to your website `/sell-phone`
2. Fill out the complete form
3. Submit and check Google Sheets
4. Verify email notification received

### **2. Test Contact Form:**
1. Go to `/contact`
2. Fill out the form
3. Check "Contact Inquiries" sheet
4. Verify email notification

### **3. Check Data Quality:**
- All timestamps in IST
- Phone values calculated correctly
- Customer details complete
- Status fields populated

---

## 🔒 **Security & Privacy**

### **Data Protection:**
- Google Sheets is private to your account
- HTTPS encryption for all data transmission
- No sensitive data stored in frontend code
- Email notifications only to authorized recipients

### **Access Control:**
- Only you can access the Google Sheet
- Apps Script runs under your Google account
- Web app accepts data from any source (your website)

---

## 📈 **Analytics & Reporting**

### **Built-in Functions:**
```javascript
// Get form statistics
getFormStats()

// Export data as CSV
exportToCSV('Sell Phone Leads')
```

### **Manual Analysis:**
- Sort by timestamp for recent leads
- Filter by phone brand/model
- Calculate average phone values
- Track conversion rates

---

## 🛠️ **Troubleshooting**

### **Common Issues:**

#### **1. Form Not Submitting**
- Check script URL is correct
- Verify Apps Script deployment
- Check browser console for errors

#### **2. No Email Notifications**
- Update admin email in Apps Script
- Check Gmail spam folder
- Verify script permissions

#### **3. Data Not Appearing**
- Check sheet names match exactly
- Verify script deployment settings
- Test with simple data first

#### **4. CORS Errors**
- Ensure Apps Script is deployed as web app
- Set access to "Anyone"
- Check script URL format

---

## 🔄 **Maintenance**

### **Regular Tasks:**
- **Weekly**: Review new leads and follow up
- **Monthly**: Export data backup
- **Quarterly**: Update phone price database
- **Yearly**: Review and optimize pricing algorithm

### **Updates:**
- Add new phone models to price database
- Adjust condition multipliers based on market
- Update email templates
- Enhance data validation

---

## 💡 **Pro Tips**

1. **Set up Google Sheets filters** for easy lead management
2. **Use conditional formatting** to highlight high-value leads
3. **Create pivot tables** for sales analytics
4. **Set up Google Forms** as backup data collection
5. **Use Google Data Studio** for advanced reporting

---

## 📞 **Support**

If you encounter issues:
1. Check the troubleshooting section
2. Verify all setup steps completed
3. Test with simple form data
4. Check Google Apps Script logs

---

**Your MobileBuyer.in forms are now connected to Google Sheets! 🎉**

1gpQKk1eTJXb8I6Tvn-W0VTsxWs0BhSOVcfREOJKhkjc

All customer inquiries and phone sale leads will be automatically collected and organized for easy management.