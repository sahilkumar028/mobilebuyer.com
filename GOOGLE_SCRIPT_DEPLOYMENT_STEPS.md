# 🔧 Google Apps Script Deployment - Step by Step

## 🚨 **CRITICAL: Your Script is Returning HTML Instead of JSON**

This means it's **NOT properly deployed as a Web App**. Follow these exact steps:

## **Step 1: Open Google Apps Script**
1. Go to [script.google.com](https://script.google.com)
2. Open your MobileBuyer project
3. Make sure all code is saved (Ctrl+S)

## **Step 2: Deploy as Web App**

### **🔥 CRITICAL DEPLOYMENT STEPS:**

1. **Click "Deploy" button** (top right)
2. **Click "New Deployment"**
3. **Click the gear icon ⚙️** next to "Type"
4. **Select "Web app"** from dropdown

### **🎯 EXACT SETTINGS (MUST BE EXACT):**

```
✅ Description: MobileBuyer API v5
✅ Execute as: Me (your-email@gmail.com)
✅ Who has access: Anyone  ← MUST BE "Anyone" NOT "Only myself"
```

5. **Click "Deploy"**
6. **Click "Authorize access"**
7. **Choose your Google account**
8. **Click "Advanced"** (if you see a warning)
9. **Click "Go to [Your Script Name] (unsafe)"**
10. **Click "Allow"**

## **Step 3: Get the Correct URL**

After deployment, you'll get a URL like:
```
https://script.google.com/macros/s/AKfycbz...LONG_ID.../exec
```

**CRITICAL:** The URL MUST end with `/exec` NOT `/edit`

## **Step 4: Test the URL IMMEDIATELY**

**Before updating your app, test the script URL directly:**

1. **Copy the Web App URL**
2. **Open in browser:**
   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getCompanies
   ```

### **Expected Results:**

**✅ SUCCESS (JSON Response):**
```json
[
  {"name": "Apple", "logo": "https://..."},
  {"name": "Samsung", "logo": "https://..."},
  {"name": "OnePlus", "logo": "https://..."}
]
```

**❌ FAILURE (HTML Response):**
```html
<!DOCTYPE html>
<html>
<head>
<title>Error</title>
...
```

**If you see HTML, the deployment is WRONG - repeat the steps!**

## **Step 5: Update Your Environment Variable**

Only after the URL test succeeds:

1. **Open your `.env.local` file**
2. **Update the URL:**
   ```bash
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/NEW_SCRIPT_ID/exec
   ```
3. **Restart your dev server:**
   ```bash
   npm run dev
   ```

## **🚨 Common Mistakes That Cause HTML Errors:**

### **❌ WRONG ACCESS SETTING:**
```
Who has access: Only myself  ← This causes HTML errors
```
**✅ CORRECT:**
```
Who has access: Anyone  ← This allows public API access
```

### **❌ WRONG URL TYPE:**
```
https://script.google.com/macros/d/SCRIPT_ID/edit  ← Edit URL (WRONG)
```
**✅ CORRECT:**
```
https://script.google.com/macros/s/SCRIPT_ID/exec  ← Execution URL (CORRECT)
```

### **❌ NOT COMPLETING AUTHORIZATION:**
- Must click through the entire authorization flow
- Must click "Advanced" → "Go to [Script] (unsafe)" → "Allow"

## **🧪 Testing Checklist:**

- [ ] Script deployed as Web App
- [ ] Access set to "Anyone"
- [ ] Authorization completed
- [ ] URL ends with `/exec`
- [ ] Direct URL test returns JSON (not HTML)
- [ ] Environment variable updated
- [ ] Dev server restarted

## **🎯 Success Indicators:**

### **✅ Script URL Test:**
```bash
# This should return JSON:
curl "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getCompanies"
```

### **✅ App Console Logs:**
```
🔍 Proxy Debug: { action: 'getCompanies', scriptURL: 'SET' }
✅ Companies loaded successfully
```

### **✅ No More HTML Errors:**
```
# You should NOT see:
❌ Google Apps Script returned HTML instead of JSON
```

## **🚀 Alternative: Keep Using Static Data**

If you're still having deployment issues, your app works perfectly with static data! The proxy automatically provides fallback data, so users can still:

- Select phone companies
- Choose models
- Pick storage options
- Submit forms successfully

## **📞 Need Help?**

If you're still seeing HTML responses after following these steps:

1. **Double-check the "Who has access" setting** - it MUST be "Anyone"
2. **Make sure you're using the `/exec` URL** not the `/edit` URL
3. **Try creating a completely new deployment** instead of updating existing one
4. **Check if you have multiple Google accounts** - make sure you're using the right one

## **🎉 Once Fixed:**

Your app will work with dynamic data from Google Sheets, and you'll see:
- Real-time phone data
- Dynamic pricing
- Form submissions saved to sheets
- Email notifications

But remember: **your app already works perfectly with static data!** 🚀