# 🚀 Vercel Deployment Guide for MobileBuyer.in

## 📋 **Environment Variables Required**

### **1. REACT_APP_GOOGLE_SCRIPT_URL**
- **Value**: `https://script.google.com/macros/s/AKfycbz5htoRiwm3d9yOso1e55sSxWdZJOnK2UZPJVguXFxKc-IeS8BoS4vMB3_GaI_JoKLq/exec`
- **Description**: Your Google Apps Script Web App URL
- **Required**: Yes

### **2. REACT_APP_DEVELOPMENT_MODE** (Optional)
- **Value**: `false`
- **Description**: Set to true for development, false for production
- **Required**: No (defaults to false)

---

## 🔧 **Step-by-Step Deployment**

### **Step 1: Prepare Your Repository**
1. **Commit all changes**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin working
   ```

### **Step 2: Deploy to Vercel**

#### **Option A: Vercel CLI (Recommended)**
1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from client directory**:
   ```bash
   cd client
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project? **No**
   - Project name: **mobilebuyer-in**
   - Directory: **./client** (or current directory if you're in client folder)
   - Override settings? **No**

#### **Option B: Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Set **Root Directory** to `client`
5. Add environment variables (see below)

### **Step 3: Configure Environment Variables**

In Vercel Dashboard:
1. Go to **Project Settings** → **Environment Variables**
2. Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `REACT_APP_GOOGLE_SCRIPT_URL` | `https://script.google.com/macros/s/AKfycbz5htoRiwm3d9yOso1e55sSxWdZJOnK2UZPJVguXFxKc-IeS8BoS4vMB3_GaI_JoKLq/exec` | Production, Preview, Development |
| `REACT_APP_DEVELOPMENT_MODE` | `false` | Production, Preview, Development |

### **Step 4: Redeploy**
After adding environment variables:
1. Go to **Deployments** tab
2. Click **"Redeploy"** on the latest deployment
3. Or push a new commit to trigger automatic deployment

---

## ⚙️ **Vercel Configuration**

### **vercel.json** (Already created)
```json
{
  "version": 2,
  "name": "mobilebuyer-in",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### **Build Settings**
- **Framework Preset**: Create React App
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

---

## 🌐 **Custom Domain Setup** (Optional)

### **1. Add Custom Domain**
1. In Vercel Dashboard → **Domains**
2. Add your domain: `mobilebuyer.in`
3. Configure DNS records as instructed

### **2. DNS Configuration**
Add these records to your domain provider:
```
Type: A
Name: @
Value: 76.76.19.19

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 🔍 **Testing Deployment**

### **1. Check Environment Variables**
After deployment, open browser console and check:
```javascript
// Should show your Google Script URL
console.log(process.env.REACT_APP_GOOGLE_SCRIPT_URL);
```

### **2. Test Form Submission**
1. Go to `/sell-phone` on your Vercel URL
2. Fill out the form completely
3. Submit and check browser console for logs
4. Verify data appears in Google Sheets

### **3. Check All Routes**
- `/` - Home page
- `/about` - About page
- `/services` - Services page
- `/contact` - Contact page
- `/sell-phone` - Sell phone form

---

## 📊 **Expected Vercel URLs**

### **Automatic URLs**
- **Production**: `https://mobilebuyer-in.vercel.app`
- **Preview**: `https://mobilebuyer-in-git-working-sahilkumar028.vercel.app`

### **Custom Domain** (if configured)
- **Primary**: `https://mobilebuyer.in`
- **WWW**: `https://www.mobilebuyer.in`

---

## 🛠️ **Troubleshooting**

### **Build Failures**
- Check if all dependencies are in `package.json`
- Ensure no syntax errors in code
- Verify environment variables are set

### **Environment Variables Not Working**
- Must start with `REACT_APP_`
- Set for all environments (Production, Preview, Development)
- Redeploy after adding variables

### **Routing Issues**
- Vercel automatically handles React Router
- `vercel.json` includes SPA routing configuration

### **Google Sheets Not Working**
- Check environment variable is set correctly
- Verify Google Apps Script is deployed and accessible
- Check browser console for error messages

---

## 🚀 **Deployment Commands Summary**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from client directory)
cd client
vercel

# Or deploy with specific settings
vercel --prod
```

---

## 📝 **Post-Deployment Checklist**

- [ ] Environment variables configured
- [ ] All pages load correctly
- [ ] Form submissions work
- [ ] Google Sheets integration functional
- [ ] Mobile responsiveness verified
- [ ] SEO meta tags working
- [ ] Custom domain configured (if applicable)

---

## 🎯 **Next Steps After Deployment**

1. **Update Google Apps Script** with the new parsing logic
2. **Test end-to-end form submission**
3. **Configure custom domain** (optional)
4. **Set up analytics** (Google Analytics, etc.)
5. **Monitor performance** with Vercel Analytics

Your MobileBuyer.in app is ready for Vercel! 🎉