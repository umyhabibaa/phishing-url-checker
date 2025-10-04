# Test URLs for Phishing URL Checker

## Safe URLs (Should pass all checks)
- https://google.com
- https://microsoft.com
- https://paypal.com
- https://bankofamerica.com
- https://canvas.fau.edu

## Suspicious URLs (Should trigger warnings)

### IP Address URLs
- http://192.168.1.1/login
- https://10.0.0.1/secure

### Too Many Subdomains
- https://paypal.com.evil.com
- https://google.com.malicious.net

### Suspicious Keywords
- https://example.com/login
- https://test.com/verify-account
- https://demo.com/update-info

### URL Shorteners
- https://bit.ly/suspicious-link
- https://tinyurl.com/malicious
- https://goo.gl/evil-link

### Typosquatting
- https://goggle.com
- https://facebok.com
- https://amazom.com
- https://microsft.com

### Mixed Content
- http://example.com (when accessed from HTTPS)

## Educational Notes
These test URLs are for educational purposes only. Never visit suspicious URLs in a real environment.
