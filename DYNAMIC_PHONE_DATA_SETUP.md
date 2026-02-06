# Dynamic Phone Data System Setup

## Google Sheets Structure

### Sheet 1: "Phone_Data" 
This sheet will contain all phone information:

| Column A | Column B | Column C | Column D | Column E |
|----------|----------|----------|----------|----------|
| Company  | Model    | Storage  | Base_Price | Condition_Multiplier |
| Apple    | iPhone 15 Pro Max | 128GB | 80000 | 1.0 |
| Apple    | iPhone 15 Pro Max | 256GB | 85000 | 1.0 |
| Apple    | iPhone 15 Pro Max | 512GB | 95000 | 1.0 |
| Apple    | iPhone 15 Pro Max | 1TB   | 105000 | 1.0 |
| Apple    | iPhone 15 Pro | 128GB | 70000 | 1.0 |
| Apple    | iPhone 15 Pro | 256GB | 75000 | 1.0 |
| Apple    | iPhone 15 Pro | 512GB | 85000 | 1.0 |
| Apple    | iPhone 15 Pro | 1TB   | 95000 | 1.0 |
| Samsung  | Galaxy S24 Ultra | 256GB | 70000 | 1.0 |
| Samsung  | Galaxy S24 Ultra | 512GB | 80000 | 1.0 |
| Samsung  | Galaxy S24 Ultra | 1TB   | 90000 | 1.0 |

### Sheet 2: "Sell_Phone_Leads" 
This will store customer submissions:

| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H | Column I | Column J | Column K | Column L | Column M | Column N | Column O |
|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
| Timestamp | Customer_Name | Phone | Email | Company | Model | Storage | Phone_Age_Months | Has_Box | Has_Charger | Physical_Condition | Screen_Condition | Battery_Health | Estimated_Value | Pickup_Address |

## API Endpoints Needed

### 1. Get Companies
**URL**: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getCompanies`
**Response**: `["Apple", "Samsung", "OnePlus", "Xiaomi"]`

### 2. Get Models by Company
**URL**: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getModels&company=Apple`
**Response**: `["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 14 Pro Max"]`

### 3. Get Storage Options by Model
**URL**: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getStorage&company=Apple&model=iPhone 15 Pro Max`
**Response**: `["128GB", "256GB", "512GB", "1TB"]`

### 4. Submit Form Data
**URL**: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
**Method**: POST
**Body**: Form data with estimated value calculated but not shown to user

## Setup Instructions

1. Create a new Google Sheet with the above structure
2. Add the phone data you want to support
3. Deploy the updated Google Apps Script
4. Update the frontend to use dynamic data loading
5. Test the complete flow

## Benefits

- ✅ **Dynamic Data**: Add new phones without code changes
- ✅ **Accurate Pricing**: Real-time pricing from your sheet
- ✅ **Easy Management**: Update prices in Google Sheets
- ✅ **Scalable**: Support unlimited brands/models
- ✅ **Backend Calculation**: Price calculated but not shown to user