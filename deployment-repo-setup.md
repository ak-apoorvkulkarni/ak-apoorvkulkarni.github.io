# Deployment-Only Repository Setup

## 🎯 Goal: Deploy Website Without Exposing Source Code

This guide shows you how to create a separate repository with only the built files, keeping your source code private while making your website publicly accessible.

---

## 🚀 Method 1: Automated Script (Recommended)

### Step 1: Run the Build Script
```bash
# Make the script executable
chmod +x deploy-only-build.sh

# Run the deployment script
./deploy-only-build.sh
```

### Step 2: Create Deployment Repository
```bash
# Create a new directory for deployment
mkdir apoorv-portfolio-deploy
cd apoorv-portfolio-deploy

# Initialize git repository
git init

# Copy built files
cp -r ../apoorv-portfolio-react/deploy/* .

# Add files to git
git add .

# Commit
git commit -m "Initial deployment - Production build"

# Add remote repository (create this on GitHub first)
git remote add origin https://github.com/yourusername/apoorv-portfolio-deploy.git

# Push to GitHub
git push -u origin main
```

---

## 📁 Deployment Repository Structure

Your deployment repository will contain only these files:

```
apoorv-portfolio-deploy/
├── index.html              # Main HTML file
├── static/
│   ├── css/
│   │   └── main.[hash].css  # Minified CSS
│   ├── js/
│   │   └── main.[hash].js   # Minified JavaScript
│   └── media/
│       └── [optimized images]
├── favicon.ico
├── manifest.json
├── robots.txt
└── README.md               # Simple deployment README
```

---

## 🔒 What's Protected

### ❌ **Source Code (Private)**
- React components (`src/` folder)
- Original CSS files
- JavaScript logic
- Development configurations
- Package.json with dependencies

### ✅ **Public Files (Deployed)**
- Minified and optimized HTML/CSS/JS
- Compressed images
- Static assets
- Basic README with contact info

---

## 🌐 Deployment Options

### **Option 1: GitHub Pages**
```bash
# In your deployment repository
git checkout -b gh-pages
git push origin gh-pages

# Enable GitHub Pages in repository settings
# Set source to gh-pages branch
```

### **Option 2: Netlify**
1. Connect your deployment repository to Netlify
2. Set build command: `echo "No build needed"`
3. Set publish directory: `.` (root)
4. Deploy automatically

### **Option 3: Vercel**
1. Import your deployment repository
2. Framework preset: Other
3. Deploy automatically

### **Option 4: Traditional Web Hosting**
1. Upload all files from `deploy/` folder
2. Point domain to hosting provider
3. Configure SSL certificate

---

## 🔄 Continuous Deployment

### **Automated Workflow**
Create `.github/workflows/deploy.yml` in your main repository:

```yaml
name: Deploy to Production
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build project
      run: npm run build
      
    - name: Deploy to deployment repository
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
        external_repository: yourusername/apoorv-portfolio-deploy
        publish_branch: main
```

---

## 📋 Pre-Deployment Checklist

### **Security Review**
- [ ] No API keys in built files
- [ ] No personal email addresses exposed
- [ ] No internal company information
- [ ] No development comments

### **Content Review**
- [ ] All links work correctly
- [ ] Contact information updated
- [ ] Project descriptions accurate
- [ ] No placeholder text

### **Technical Review**
- [ ] Build completes without errors
- [ ] All images load correctly
- [ ] Mobile responsiveness works
- [ ] Performance optimized

---

## 🎨 Customization

### **Update Contact Information**
Edit `deploy/README.md`:
```markdown
## 📧 Contact
- Email: your.email@example.com
- LinkedIn: https://linkedin.com/in/yourprofile
- GitHub: https://github.com/yourusername
- Portfolio: https://your-portfolio-url.com
```

### **Add Custom Domain**
1. Purchase domain (e.g., apoorvkulkarni.com)
2. Configure DNS settings
3. Update GitHub Pages settings
4. Add CNAME file to deployment repository

---

## 🔍 Verification

### **Test Deployment**
```bash
# Test locally
cd deploy
npx serve -s .

# Check all pages load
# Test mobile navigation
# Verify contact form
# Check image loading
```

### **Performance Check**
- Use Google PageSpeed Insights
- Check mobile responsiveness
- Verify SEO meta tags
- Test loading speed

---

## 💡 Benefits of This Approach

### **🔒 Privacy**
- Source code remains private
- Development history hidden
- Personal notes protected
- Sensitive data secure

### **🚀 Performance**
- Only optimized files deployed
- Faster loading times
- Smaller repository size
- Better SEO

### **🛠️ Maintenance**
- Easy to update
- Automated deployment
- Version control for builds
- Rollback capability

---

**Result**: Your website is live and professional, but your source code and development process remain completely private! 🎉
