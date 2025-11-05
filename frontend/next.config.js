/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.hdfcbank.com',
      },
      {
        protocol: 'https',
        hostname: 'www.sbicard.com',
      },
      {
        protocol: 'https',
        hostname: 'www.axisbank.com',
      },
      {
        protocol: 'https',
        hostname: 'www.icicibank.com',
      },
      {
        protocol: 'https',
        hostname: 'icm.aexp-static.com',
      },
      {
        protocol: 'https',
        hostname: 'www.hsbc.co.in',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  },
}

module.exports = nextConfig
