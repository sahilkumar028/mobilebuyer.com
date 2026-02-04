# 🌐 Custom Domain Setup for MobileBuyer.in

## 🎯 **Domain Options & Costs**

### **1. Free Hosting + Custom Domain**
- **Domain Cost**: ₹500-1500/year (.in domain)
- **Hosting**: Free (GitHub Pages/Netlify/Vercel)
- **Total**: ₹500-1500/year

### **2. Premium Hosting + Domain**
- **Domain**: ₹500-1500/year
- **Hosting**: ₹2000-5000/year
- **Total**: ₹2500-6500/year

---

## 🔥 **Method 1: GitHub Pages + Custom Domain (Recommended)**

### **Step 1: Buy Domain**
Popular domain registrars in India:
- **GoDaddy India**: [godaddy.com/en-in](https://godaddy.com/en-in)
- **Namecheap**: [namecheap.com](https://namecheap.com)
- **BigRock**: [bigrock.in](https://bigrock.in)
- **HostGator India**: [hostgator.in](https://hostgator.in)

**Recommended domains:**
- `mobilebuyer.in` (₹800-1200/year)
- `mobilebuyer.co.in` (₹500-800/year)
- `mobilebuyerindia.com` (₹1000-1500/year)

### **Step 2: Configure DNS Settings**

In your domain registrar's DNS panel, add these records:

#### **For Apex Domain (mobilebuyer.in):**
```
Type: A
Name: @
Value: 185.199.108.153

Type: A  
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

#### **For WWW Subdomain:**
```
Type: CNAME
Name: www
Value: yourusername.github.io
```

### **Step 3: GitHub Repository Settings**
1. Go to your GitHub repository
2. Settings → Pages
3. Custom domain: Enter `mobilebuyer.in`
4. Check "Enforce HTTPS"

### **Step 4: Deploy**
```bash
cd client
npm run deploy
```

**Your site will be live at**: `https://mobilebuyer.in` 🎉

---

## ⚡ **Method 2: Netlify + Custom Domain (Easy)**

### **Step 1: Deploy to Netlify**
1. Build your app:
   ```bash
   cd client
   npm run build
   ```

2. Go to [netlify.com](https://netlify.com)
3. Drag `client/build` folder to deploy
4. Or connect your GitHub repository

### **Step 2: Add Custom Domain**
1. In Netlify dashboard → Domain settings
2. Add custom domain: `mobilebuyer.in`
3. Netlify will provide DNS instructions

### **Step 3: Update DNS**
Point your domain to Netlify:
```
Type: CNAME
Name: www
Value: your-site-name.netlify.app

Type: A
Name: @
Value: 75.2.60.5
```

**Benefits:**
- Automatic SSL certificate
- Global CDN
- Form handling
- Easy deployments

---

## 🚀 **Method 3: Vercel + Custom Domain (Fastest)**

### **Step 1: Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `client`
4. Deploy

### **Step 2: Add Domain**
1. Project settings → Domains
2. Add `mobilebuyer.in`
3. Follow DNS configuration instructions

### **Step 3: DNS Configuration**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

---

## 🏢 **Method 4: Professional Hosting (Recommended for Business)**

### **Popular Indian Hosting Providers:**

#### **1. Hostinger India** (₹149/month)
- **Features**: SSD storage, free SSL, 24/7 support
- **Setup**: Upload build files via cPanel
- **Domain**: Often included free for first year

#### **2. Bluehost India** (₹199/month)
- **Features**: WordPress optimized, free domain, SSL
- **Good for**: Business websites with backend needs

#### **3. A2 Hosting** (₹299/month)
- **Features**: High performance, global CDN
- **Best for**: Fast loading speeds

### **Setup Steps:**
1. **Purchase hosting + domain package**
2. **Upload your build files:**
   ```bash
   cd client
   npm run build
   # Upload contents of 'build' folder to public_html
   ```
3. **Configure domain DNS** (usually automatic)
4. **Enable SSL certificate** (free with most hosts)

---

## 📱 **Method 5: Indian Cloud Providers**

### **1. DigitalOcean Bangalore** (₹400/month)
```bash
# Create droplet in Bangalore region
# Install Node.js and serve your app
npm install -g serve
serve -s build -p 80
```

### **2. AWS Mumbai Region**
- **S3 + CloudFront**: ₹200-500/month
- **EC2 instance**: ₹800-2000/month

### **3. Google Cloud Mumbai**
- **Firebase Hosting**: ₹0-500/month
- **Compute Engine**: ₹600-1500/month

---

## 🔧 **DNS Configuration Examples**

### **GoDaddy DNS Setup:**
1. Login to GoDaddy account
2. My Products → DNS
3. Add records as shown above
4. Wait 24-48 hours for propagation

### **Namecheap DNS Setup:**
1. Domain List → Manage
2. Advanced DNS tab
3. Add A and CNAME records
4. Save changes

### **CloudFlare Setup (Recommended for Speed):**
1. Add your domain to CloudFlare
2. Update nameservers at your registrar
3. Configure DNS records in CloudFlare
4. Enable SSL and CDN

---

## 📊 **Performance Optimization for Custom Domain**

### **1. Enable Compression**
```javascript
// Add to public/_headers (Netlify)
/*
  Content-Encoding: gzip
  Cache-Control: public, max-age=31536000
```

### **2. Image Optimization**
- Use WebP format for images
- Compress images before upload
- Implement lazy loading

### **3. CDN Setup**
- CloudFlare (Free tier available)
- AWS CloudFront
- Google Cloud CDN

---

## 🔒 **Security & SSL**

### **Free SSL Options:**
- **Let's Encrypt**: Automatic with most hosts
- **CloudFlare SSL**: Free tier available
- **GitHub Pages**: Automatic SSL

### **Security Headers:**
```javascript
// Add to _headers file
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## 📈 **SEO Setup for Custom Domain**

### **1. Google Search Console**
1. Add property: `https://mobilebuyer.in`
2. Verify ownership
3. Submit sitemap: `https://mobilebuyer.in/sitemap.xml`

### **2. Google Analytics**
```javascript
// Add tracking code to index.html
gtag('config', 'GA_MEASUREMENT_ID', {
  page_title: 'MobileBuyer.in',
  page_location: 'https://mobilebuyer.in'
});
```

### **3. Local Business Setup**
- Google My Business listing
- Bing Places for Business
- Local directory submissions

---

## 🚀 **Quick Start Commands**

```bash
# 1. Update for custom domain
cd client
npm install

# 2. Build for production
npm run build

# 3. Deploy to GitHub Pages
npm run deploy

# 4. Test locally with custom domain
echo "127.0.0.1 mobilebuyer.in" >> /etc/hosts
npm start
```

---

## 💡 **Pro Tips**

1. **Choose .in domain** for better local SEO in India
2. **Enable HTTPS** always for trust and SEO
3. **Use CDN** for faster loading across India
4. **Monitor uptime** with services like UptimeRobot
5. **Backup regularly** your website files

---

## 🆘 **Troubleshooting**

### **Domain Not Working:**
- Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
- Wait 24-48 hours for full propagation
- Clear browser cache and DNS cache

### **SSL Certificate Issues:**
- Force HTTPS in hosting settings
- Check mixed content warnings
- Update all URLs to HTTPS

### **Performance Issues:**
- Enable compression
- Optimize images
- Use CDN
- Monitor Core Web Vitals

---

**Your MobileBuyer.in website will be live on your custom domain! 🎉**

**Recommended**: Start with **GitHub Pages + Custom Domain** for ₹800-1200/year total cost.