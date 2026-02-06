# Deploy MobileBuyer.in Next.js App to Vercel

## 🚀 Complete Deployment Guide

### Prerequisites
- ✅ Next.js app is ready (`client-nextjs` folder)
- ✅ Google Apps Script is deployed and working
- ✅ Google Script URL is available
- ✅ GitHub account (recommended)
- ✅ Vercel account

## Step 1: Prepare Your Next.js App

### 1.1 Create Environment Variables File
Create `.env.local` in your `client-nextjs` folder:

```bash
# client-nextjs/.env.local
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

**Replace `YOUR_SCRIPT_ID`** with your actual Google Apps Script ID.

### 1.2 Create .gitignore (if not exists)
```bash
# client-nextjs/.gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/

# Production
build/
dist/

# Environment variables
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

### 1.3 Verify package.json Scripts
Ensure your `client-nextjs/package.json` has these scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel CLI (Recommended)

#### 2.1 Install Vercel CLI
```bash
npm install -g vercel
```

#### 2.2 Login to Vercel
```bash
vercel login
```

#### 2.3 Deploy from client-nextjs folder
```bash
cd client-nextjs
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → mobilebuyer-in (or your preferred name)
- **Directory?** → ./ (current directory)
- **Override settings?** → No

#### 2.4 Set Environment Variables
```bash
vercel env add NEXT_PUBLIC_GOOGLE_SCRIPT_URL
```
Enter your Google Apps Script URL when prompted.

#### 2.5 Redeploy with Environment Variables
```bash
vercel --prod
```

### Option B: Deploy via Vercel Dashboard

#### 2.1 Push to GitHub
1. Create a new repository on GitHub
2. Push your `client-nextjs` folder to the repository:

```bash
cd client-nextjs
git init
git add .
git commit -m "Initial commit - MobileBuyer.in Next.js app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mobilebuyer-nextjs.git
git push -u origin main
```

#### 2.2 Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./ (if you pushed only client-nextjs contents)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### 2.3 Add Environment Variables
In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
3. Value: Your Google Apps Script URL
4. Environment: Production, Preview, Development

#### 2.4 Deploy
Click "Deploy" and wait for the build to complete.

## Step 3: Configure Custom Domain (Optional)

### 3.1 Add Domain in Vercel
1. Go to Project Settings → Domains
2. Add your domain: `mobilebuyer.in`
3. Add www subdomain: `www.mobilebuyer.in`

### 3.2 Update DNS Records
Point your domain to Vercel:
- **A Record**: `76.76.19.61`
- **CNAME**: `cname.vercel-dns.com`

## Step 4: Verify Deployment

### 4.1 Check These URLs Work:
- ✅ Homepage: `https://your-app.vercel.app`
- ✅ About: `https://your-app.vercel.app/about`
- ✅ Services: `https://your-app.vercel.app/services`
- ✅ Contact: `https://your-app.vercel.app/contact`
- ✅ Sell Phone: `https://your-app.vercel.app/sell-phone`

### 4.2 Test Forms:
- ✅ Contact form submission
- ✅ Sell phone form submission
- ✅ Google Sheets integration
- ✅ WhatsApp links work
- ✅ Phone call links work

### 4.3 Check SEO:
- ✅ Sitemap: `https://your-app.vercel.app/sitemap.xml`
- ✅ Robots: `https://your-app.vercel.app/robots.txt`
- ✅ Manifest: `https://your-app.vercel.app/manifest.json`

## Step 5: Post-Deployment Setup

### 5.1 Update Google Apps Script CORS (if needed)
If you face CORS issues, ensure your Google Apps Script allows your domain.

### 5.2 Test All Contact Methods
- ✅ WhatsApp: +91-9210657563
- ✅ WhatsApp: +91-9205124447
- ✅ Phone calls work
- ✅ Email links work

### 5.3 Google Analytics (Optional)
Add Google Analytics to track visitors:

1. Create `client-nextjs/src/app/analytics.tsx`:
```tsx
'use client';

import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    // Add Google Analytics code here
  }, []);

  return null;
}
```

2. Import in `layout.tsx`:
```tsx
import Analytics from './analytics';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Step 6: Monitoring & Maintenance

### 6.1 Vercel Analytics
Enable Vercel Analytics in your project dashboard for:
- Page views
- Performance metrics
- User behavior

### 6.2 Error Monitoring
Monitor your deployment:
- Check Vercel Functions logs
- Monitor form submissions
- Check Google Sheets data

### 6.3 Regular Updates
Keep your app updated:
```bash
cd client-nextjs
git add .
git commit -m "Update: description of changes"
git push
```
Vercel will auto-deploy on push.

## 🔧 Troubleshooting

### Build Errors
If build fails:
1. Check `npm run build` locally
2. Fix any TypeScript errors
3. Ensure all imports are correct

### Environment Variables Not Working
1. Verify variable name: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
2. Check it's set in Vercel dashboard
3. Redeploy after adding variables

### Forms Not Submitting
1. Check Google Apps Script URL is correct
2. Verify CORS settings in Google Apps Script
3. Check browser console for errors

### 404 Errors
1. Ensure all pages are in correct folders
2. Check file naming conventions
3. Verify routing structure

## 📱 Mobile Testing

Test on mobile devices:
- ✅ Responsive design
- ✅ Touch interactions
- ✅ WhatsApp links open app
- ✅ Phone links work
- ✅ Forms are usable

## 🎉 Success!

Your MobileBuyer.in Next.js app should now be live on Vercel with:
- ✅ All pages working
- ✅ Forms submitting to Google Sheets
- ✅ Contact methods functional
- ✅ SEO optimized
- ✅ Mobile responsive
- ✅ Fast loading

**Your app is ready to serve customers in Delhi NCR!**