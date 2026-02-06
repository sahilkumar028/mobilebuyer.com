# 🚀 Dynamic Phone Data System - Complete Setup Guide

## ✅ What's Been Updated

### 1. **Next.js Form** (`client-nextjs/src/app/sell-phone/page.tsx`)
- ✅ Dynamic company loading from Google Sheets
- ✅ Dynamic model loading based on selected company
- ✅ Dynamic storage options based on selected model
- ✅ Removed frontend price calculation
- ✅ Backend-only estimated value calculation
- ✅ Form validation for all required fields
- ✅ Loading states for better UX

### 2. **Google Apps Script** (`google-apps-script/DynamicCode.gs`)
- ✅ API endpoints for companies, models, storage
- ✅ Dynamic data extraction from Google Sheets
- ✅ Backend price calculation using sheet data
- ✅ Email notifications with estimated value
- ✅ Automatic lead storage

### 3. **React Form** (`client/src/pages/SellPhone.js`)
- ✅ Updated to use 'company' instead of 'brand'
- ✅ Added storage field support
- ✅ Consistent with Next.js version

## 🔧 Setup Steps

### Step 1: Create Google Sheet Structure

1. **Create New Google Sheet**:
   ```
   Name: "MobileBuyer Phone Data"
   ```

2. **Sheet 1: "Phone_Data"**:
   ```
   Column A: Company (Apple, Samsung, OnePlus, etc.)
   Column B: Model (iPhone 15 Pro Max, Galaxy S24 Ultra, etc.)
   Column C: Storage (128GB, 256GB, 512GB, 1TB)
   Column D: Base_Price (80000, 70000, etc.)
   Column E: Condition_Multiplier (1.0 - for future use)
   ```

3. **Sheet 2: "Sell_Phone_Leads"** (will be auto-created):
   ```
   Headers: Timestamp, Customer Name, Phone, Email, Company, Model, Storage, 
           Phone Age (Months), Has Box, Has Charger, Physical Condition, 
           Screen Condition, Battery Health, Estimated Value, Pickup Address
   ```

### Step 2: Add Sample Data

Copy data from `SAMPLE_GOOGLE_SHEET_DATA.md` into your Phone_Data sheet.

### Step 3: Deploy Google Apps Script

1. **Open Google Apps Script**:
   - Go to your Google Sheet
   - Extensions → Apps Script

2. **Replace Code**:
   - Delete default code
   - Copy content from `google-apps-script/DynamicCode.gs`
   - Save the project

3. **Deploy as Web App**:
   - Click "Deploy" → "New deployment"
   - Type: Web app
   - Execute as: Me
   - Who has access: Anyone
   - Click "Deploy"
   - Copy the Web App URL

### Step 4: Update Environment Variables

Add to your `.env.local` file:
```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### Step 5: Update Email in Script

In `DynamicCode.gs`, update line with your email:
```javascript
const emailAddress = 'your-email@example.com';
```

## 🎯 How It Works

### **Customer Experience**:
1. **Select Company**: Dropdown loads from Google Sheets
2. **Select Model**: Models appear based on selected company
3. **Select Storage**: Storage options appear based on selected model
4. **Complete Form**: Fill condition, accessories, contact info
5. **Submit**: No price shown, expert contact promised

### **Your Experience**:
1. **Receive Email**: Complete details + estimated value
2. **Google Sheets**: New lead added automatically
3. **Contact Customer**: Call within 2 hours with your quote
4. **Close Deal**: Arrange pickup and payment

### **Backend Process**:
1. **Dynamic Loading**: 
   ```
   GET /script?action=getCompanies → ["Apple", "Samsung", ...]
   GET /script?action=getModels&company=Apple → ["iPhone 15 Pro Max", ...]
   GET /script?action=getStorage&company=Apple&model=iPhone 15 Pro Max → ["128GB", "256GB", ...]
   ```

2. **Form Submission**:
   ```
   POST /script → {company, model, storage, conditions, contact}
   → Calculate estimated value using sheet data
   → Store in Sell_Phone_Leads sheet
   → Send email notification
   → Return success message
   ```

## 📊 Price Calculation Logic

```javascript
Base Price (from sheet) 
× Physical Condition (excellent: 0.75, good: 0.65, fair: 0.50, poor: 0.35)
× Screen Condition (perfect: 1.0, minor-scratches: 0.9, cracked: 0.7, damaged: 0.5)
× Battery Health (excellent: 1.0, good: 0.9, average: 0.8, poor: 0.6)
× Box Bonus (1.05 if has box)
× Charger Bonus (1.03 if has charger)
× Age Depreciation (max 0.3, decreases 15% per year)
= Final Estimated Value
```

## 🔄 Adding New Phones

Simply add rows to your Phone_Data sheet:

```
| Realme | Realme GT 5 Pro | 256GB | 25000 | 1.0 |
| Realme | Realme GT 5 Pro | 512GB | 30000 | 1.0 |
| Nothing | Nothing Phone 2 | 256GB | 35000 | 1.0 |
| Nothing | Nothing Phone 2 | 512GB | 40000 | 1.0 |
```

The form will automatically pick up these new options!

## 🧪 Testing

### Test API Endpoints:
```bash
# Test companies
curl "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getCompanies"

# Test models
curl "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getModels&company=Apple"

# Test storage
curl "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getStorage&company=Apple&model=iPhone%2015%20Pro%20Max"
```

### Test Form Submission:
1. Fill out the form completely
2. Check Google Sheets for new lead
3. Check email for notification
4. Verify estimated value calculation

## 🎉 Benefits

### **For You**:
- ✅ **Complete Control**: No prices shown to customers
- ✅ **Easy Management**: Update prices in Google Sheets
- ✅ **Professional Process**: Expert consultation approach
- ✅ **Quality Leads**: Serious inquiries only
- ✅ **Automated Backend**: Calculation and storage handled

### **For Customers**:
- ✅ **Easy Selection**: Dynamic dropdowns
- ✅ **Professional Experience**: No automated pricing
- ✅ **Expert Service**: Human contact promised
- ✅ **Quick Response**: 2-hour contact guarantee

### **Technical**:
- ✅ **Scalable**: Add unlimited phones without code changes
- ✅ **Maintainable**: All data in Google Sheets
- ✅ **Reliable**: Fallback options for API failures
- ✅ **Fast**: Efficient data loading and caching

## 🚨 Important Notes

1. **No Price Display**: Customers never see estimated values
2. **Backend Only**: Price calculation happens server-side
3. **Expert Contact**: You control all pricing conversations
4. **Data Driven**: All phone data comes from your Google Sheet
5. **Flexible**: Easy to add/remove/update phone models and prices

Your phone selling form is now a professional lead generation system with complete pricing control! 🎯