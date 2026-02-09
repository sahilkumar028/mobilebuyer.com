# 🔧 Troubleshooting Guide - Why It's Not Working

## 🚨 **Most Likely Issue: Missing Google Apps Script URL**

Your `.env.local` file is missing the Google Apps Script deployment URL!

### **Current `.env.local`:**
```env
NEXT_PUBLIC_DEVELOPMENT_MODE=false
```

### **What's Missing:**
```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

## 🔍 **Step-by-Step Fix**

### **Step 1: Deploy Your Google Apps Script**

1. **Go to Google Apps Script**: [script.google.com](https://script.google.com)
2. **Find your project** or create a new one
3. **Copy the entire `CombinedCode.gs` content** from your file
4. **Paste it** into Google Apps Script
5. **Save** (Ctrl+S)
6. **Deploy**:
   - Click "Deploy" > "New deployment"
   - Type: "Web app"
   - Execute as: "Me"
   - Who has access: "Anyone"
   - Click "Deploy"
7. **Copy the deployment URL** (looks like: `https://script.google.com/macros/s/ABC123.../exec`)

### **Step 2: Update Your Environment**

Add the URL to your `.env.local`:

```env
# Environment Variables for MobileBuyer.in Next.js App

# Google Apps Script URL (REQUIRED!)
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec

# Development mode
NEXT_PUBLIC_DEVELOPMENT_MODE=false
```

### **Step 3: Test Your Setup**

1. **Restart your dev server**:
   ```bash
   npm run dev
   ```

2. **Visit your form**: `http://localhost:3000/sell-phone`

3. **Check browser console** for any errors

## 🧪 **Quick Tests**

### **Test 1: Direct API Call**
Open browser console and run:
```javascript
fetch('https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?action=getCompanies')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

**Expected Result:** Array of companies with logos

### **Test 2: Form Submission**
1. Fill out the form completely
2. Submit
3. Check console for success/error messages

## 🚨 **Common Issues & Solutions**

### **Issue 1: CORS Errors**
```
Access to fetch... blocked by CORS policy
```
**Solution:** Make sure you deployed the UPDATED script with CORS headers

### **Issue 2: "Script function not found"**
```
Script function not found: doGet
```
**Solution:** Make sure you copied the ENTIRE `CombinedCode.gs` content

### **Issue 3: "Permission denied"**
```
You don't have permission to access this resource
```
**Solution:** 
- Redeploy with "Who has access: Anyone"
- Make sure you're using the correct deployment URL

### **Issue 4: Form Not Submitting**
**Check:**
- Is `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` set correctly?
- Are you getting any console errors?
- Is the Google Apps Script deployed and accessible?

### **Issue 5: Dropdowns Not Loading**
**Check:**
- Companies dropdown should load immediately (static data)
- Models dropdown loads when you select a company
- Storage dropdown loads when you select a model

## 🔍 **Debug Steps**

### **1. Check Environment Variables**
In browser console:
```javascript
console.log('Google Script URL:', process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL);
```

### **2. Check Network Tab**
1. Open DevTools > Network
2. Try to submit form
3. Look for requests to `script.google.com`
4. Check if they're successful (200) or failing

### **3. Check Google Apps Script Logs**
1. Go to Google Apps Script
2. Click "Executions" in sidebar
3. Look for recent executions and any errors

## 📋 **Checklist**

- [ ] Google Apps Script deployed with updated code
- [ ] Deployment URL copied correctly
- [ ] `.env.local` updated with `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
- [ ] Dev server restarted
- [ ] No CORS errors in console
- [ ] Companies dropdown loads
- [ ] Form submission works

## 🆘 **Still Not Working?**

**Tell me:**
1. **What specific error** are you seeing?
2. **Where** are you seeing it? (browser console, network tab, etc.)
3. **Have you completed** the deployment steps above?
4. **What happens** when you try to submit the form?

**Most common fix:** Add the Google Apps Script URL to your `.env.local` file! 🎯