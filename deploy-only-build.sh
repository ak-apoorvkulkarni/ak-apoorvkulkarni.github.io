#!/bin/bash

# Production Build Deployment Script
# This script builds the project and creates a deployment folder with only production files

echo "🚀 Starting production build deployment..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf build/
rm -rf deploy/

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Create deployment directory
echo "📁 Creating deployment directory..."
mkdir -p deploy

# Copy only the built files
echo "📋 Copying production files..."
cp -r build/* deploy/

# Create a simple README for the deployment
echo "📝 Creating deployment README..."
cat > deploy/README.md << 'EOF'
# Apoorv Kulkarni - Portfolio

This is the production build of Apoorv Kulkarni's portfolio website.

## 🌐 Live Website
Visit: [Your Portfolio URL]

## 📧 Contact
- Email: [Your Email]
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

## 🛠️ Technologies Used
- React.js
- Modern CSS3
- Responsive Design
- Mobile-First Approach

---
*Built with ❤️ by Apoorv Kulkarni*
EOF

# Create a simple index.html redirect (optional)
echo "🔗 Creating redirect file..."
cat > deploy/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Apoorv Kulkarni - Portfolio</title>
    <meta name="description" content="Electrical Engineer & Embedded Systems Developer Portfolio">
    <meta name="keywords" content="electrical engineering, embedded systems, PCB design, IoT, microcontrollers">
    <meta name="author" content="Apoorv Kulkarni">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://your-portfolio-url.com/">
    <meta property="og:title" content="Apoorv Kulkarni - Portfolio">
    <meta property="og:description" content="Electrical Engineer & Embedded Systems Developer">
    <meta property="og:image" content="https://your-portfolio-url.com/profile.jpg">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://your-portfolio-url.com/">
    <meta property="twitter:title" content="Apoorv Kulkarni - Portfolio">
    <meta property="twitter:description" content="Electrical Engineer & Embedded Systems Developer">
    <meta property="twitter:image" content="https://your-portfolio-url.com/profile.jpg">
    
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
</body>
</html>
EOF

echo "✅ Deployment files created successfully!"
echo "📂 Deployment folder: ./deploy/"
echo ""
echo "🌐 To deploy:"
echo "1. Upload contents of ./deploy/ to your web server"
echo "2. Or push ./deploy/ to a separate GitHub repository"
echo ""
echo "🔒 Your source code remains private!"
