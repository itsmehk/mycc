# Images Directory

This directory contains all image assets for CardMatch Pro.

## Structure

```
images/
├── banks/          # Bank logos (SVG)
├── cards/          # Credit card images (PNG)
├── favicon.ico     # Site favicon
└── og-image.png    # Open Graph image for social sharing
```

## Required Files

### 1. favicon.ico
- Size: 16×16, 32×32, 48×48 (multi-size ICO file)
- Should contain the CardMatch Pro logo or a credit card icon
- Use a favicon generator tool

### 2. og-image.png
- Size: 1200×630 pixels (Facebook/Twitter recommended)
- Should include:
  - CardMatch Pro branding
  - Tagline: "Find Your Perfect Credit Card in 2 Minutes"
  - Professional design with gradient background
- Format: PNG or JPG
- File size: Under 500 KB

## Image Optimization

All images should be optimized for web:
- Use tools like TinyPNG, ImageOptim, or SVGO
- Enable lazy loading for better performance
- Provide appropriate alt text for accessibility
- Use srcset for responsive images when needed

## CDN Deployment

For production, consider:
- Hosting images on a CDN (Cloudflare, AWS CloudFront)
- Using WebP format with PNG/JPG fallbacks
- Implementing responsive images with multiple sizes
- Setting appropriate cache headers
