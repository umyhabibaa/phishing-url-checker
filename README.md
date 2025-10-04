# Phishing URL Checker - Web Frontend

A modern, responsive web application for detecting potential phishing URLs. This is the frontend version of the original Python Tkinter application, designed to be deployed as a static site on Vercel.

## Features

- 🔍 **URL Analysis**: Checks URLs for common phishing indicators
- 🛡️ **Security Checks**: Validates domains, IP addresses, and suspicious patterns
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Fast Performance**: Client-side analysis with instant results
- 🎨 **Modern UI**: Beautiful, intuitive interface with smooth animations
- 🔒 **Security Headers**: Configured with proper security headers for production

## What It Checks

- **IP Addresses**: Detects URLs using IP addresses instead of domains
- **Subdomain Analysis**: Identifies suspicious subdomain patterns
- **Keyword Detection**: Scans for common phishing keywords
- **Trusted Domains**: Verifies against a list of known trusted domains
- **URL Shorteners**: Warns about shortened URLs that could hide destinations
- **Typosquatting**: Detects common domain typos
- **Protocol Security**: Checks for insecure HTTP connections

## Deployment on Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed):

   ```bash
   npm i -g vercel
   ```

2. **Navigate to the project directory**:

   ```bash
   cd /Users/umyhabiba/Documents/phising_tool
   ```

3. **Deploy to Vercel**:

   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new one
   - Choose your team (if applicable)
   - Confirm the project settings

### Option 2: Deploy via Vercel Dashboard

1. **Push to GitHub** (if not already done):

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Phishing URL Checker frontend"
   git branch -M main
   git remote add origin https://github.com/yourusername/phishing-tool.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your repository
   - Vercel will automatically detect it as a static site
   - Click "Deploy"

### Option 3: Drag & Drop Deployment

1. **Zip the project files**:

   - Select all files except the original Python file
   - Create a zip archive

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Drag and drop the zip file
   - Your site will be deployed instantly

## File Structure

```
phising_tool/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript logic and URL analysis
├── vercel.json         # Vercel deployment configuration
├── README.md           # This file
└── phishing _tool.py   # Original Python application
```

## Configuration

The application uses the same detection logic as the original Python version:

- **Suspicious Keywords**: `["login", "verify", "update", "secure", "account", "banking"]`
- **Trusted Domains**: `["paypal.com", "google.com", "microsoft.com", "bankofamerica.com", "canvas.fau.edu"]`

You can modify these in `script.js` to customize the detection rules.

## Security Features

The `vercel.json` file includes security headers:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

To run locally:

1. **Serve the files** using any static server:

   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve .

   # Using PHP
   php -S localhost:8000
   ```

2. **Open in browser**: `http://localhost:8000`

## Customization

### Adding New Detection Rules

Edit `script.js` and modify the `analyzeUrl()` function:

```javascript
// Add new suspicious keywords
const SUSPICIOUS_KEYWORDS = [
  "login",
  "verify",
  "update",
  "secure",
  "account",
  "banking",
  "your-new-keyword",
];

// Add new trusted domains
const TRUSTED_DOMAINS = [
  "paypal.com",
  "google.com",
  "microsoft.com",
  "bankofamerica.com",
  "canvas.fau.edu",
  "your-trusted-domain.com",
];
```

### Styling Changes

Modify `styles.css` to change the appearance:

- Colors: Update CSS custom properties
- Layout: Modify grid and flexbox properties
- Animations: Adjust transition and animation values

## Educational Purpose

This tool is designed for educational purposes to help users learn about phishing detection techniques. It should not be used as the sole method for determining URL safety. Always verify URLs through official channels and use additional security measures.

## License

This project is for educational purposes. Please use responsibly and in accordance with applicable laws and regulations.

## Contributing

Feel free to submit issues and enhancement requests. This is an educational project designed to help people learn about cybersecurity and phishing detection.
