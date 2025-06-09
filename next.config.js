/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Build output directory for Netlify
  distDir: 'dist',
  
  // Image optimization for Netlify
  images: {
    unoptimized: true,
  },
  
  // Ensure trailing slash consistency
  trailingSlash: false,
  
  // Custom webpack config if needed
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig; 