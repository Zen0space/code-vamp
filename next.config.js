/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Enable experimental features if needed
  },
  // Configure for static export if needed for deployment
  // output: 'export',
  // trailingSlash: true,
  
  // Image optimization
  images: {
    unoptimized: false,
  },
  
  // Custom webpack config if needed
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig; 