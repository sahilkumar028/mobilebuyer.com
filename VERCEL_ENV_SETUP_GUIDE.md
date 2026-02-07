# 🔧 Vercel Environment Variables Setup Guide

## Step 1: Deploy Google Apps Script

### 1.1 Open Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Create new project or open existing one
3. Paste the `CombinedCode.gs` content
4. Save the project

### 1.2 Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Choose type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Click **Deploy**
6. **Copy the Web App URL** (looks like this):
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

## Step 2: Set Environment Variable in Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**:
   - Visit [vercel.com](https://vercel.com)
   - Login to your account
   - Select your project

2. **Navigate to Settings**:
   - Click on your project
   - Go to **Settings** tab
   - Click **Environment Variables**

3. **Add Environment Variable**:
   - **Name**: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
   - **Value**: Your Google Apps Script URL
   - **Environments**: Select all (Production, Preview, Development)
   - Click **Save**

### Method 2: Vercel CLI

```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Login to Vercel
vercel login

# Add environment variable
vercel env add NEXT_PUBLIC_GOOGLE_SCRIPT_URL
# Paste your Google Apps Script URL when prompted
# Select all environments (Production, Preview, Development)
```

## Step 3: Local Development Setup

### 3.1 Create .env.local file
```bash
# In your project root (client-nextjs/)
touch .env.local
```

### 3.2 Add the environment variable
```env
# .env.local
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### 3.3 Add to .gitignore
```gitignore
# Environment variables
.env.local
.env.*.local
```

## Step 4: Redeploy Your Application

### Option 1: Automatic Deployment
- Push changes to your Git repository
- Vercel will automatically redeploy with new environment variables

### Option 2: Manual Deployment
```bash
# Using Vercel CLI
vercel --prod
```

### Option 3: Vercel Dashboard
- Go to your project in Vercel Dashboard
- Click **Deployments** tab
- Click **Redeploy** on latest deployment

## Step 5: Verify Setup

### 5.1 Check Environment Variable
```javascript
// In your Next.js component
console.log('Google Script URL:', process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL);
```

### 5.2 Test API Calls
1. Open your deployed website
2. Go to sell-phone page
3. Open browser DevTools → Network tab
4. Check if API calls are made to your Google Script URL

## 🔒 Security Best Practices

### Environment Variable Naming
- ✅ Use `NEXT_PUBLIC_` prefix for client-side variables
- ✅ Use descriptive names: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
- ❌ Don't use generic names like `API_URL`

### Google Apps Script Security
1. **Restrict Access** (if needed):
   - Change "Who has access" to "Anyone with Google account"
   - Or use specific email addresses

2. **Monitor Usage**:
   - Check Google Apps Script dashboard for usage
   - Monitor for unusual activity

## 🧪 Testing

### Test Local Development
```bash
# Start development server
npm run dev

# Check if environment variable is loaded
# Should see companies loading from Google Sheets
```

### Test Production
1. Visit your deployed Vercel URL
2. Go to `/sell-phone` page
3. Check if company logos load
4. Test form submission

## 🚨 Troubleshooting

### Environment Variable Not Working
1. **Check Variable Name**: Must be `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
2. **Check All Environments**: Set for Production, Preview, Development
3. **Redeploy**: Environment changes require redeployment
4. **Clear Cache**: Hard refresh browser (Ctrl+F5)

### Google Script Issues
1. **Check Permissions**: Script must be deployed with "Anyone" access
2. **Check URL**: Must end with `/exec`
3. **Test Direct**: Visit script URL in browser - should return JSON
4. **Check Logs**: View execution logs in Google Apps Script

### CORS Issues
```javascript
// In Google Apps Script, ensure CORS headers are set
function doGet(e) {
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  // CORS is automatically handled by Google Apps Script
  return output.setContent(JSON.stringify(data));
}
```

## 📋 Quick Reference

### Environment Variable
```
Name: NEXT_PUBLIC_GOOGLE_SCRIPT_URL
Value: https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### Usage in Code
```javascript
const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
const response = await fetch(`${scriptURL}?action=getCompanies`);
```

### Vercel CLI Commands
```bash
vercel env ls                    # List environment variables
vercel env add                   # Add environment variable
vercel env rm                    # Remove environment variable
vercel --prod                    # Deploy to production
```

Your Google Apps Script URL is now securely configured in Vercel! 🎉