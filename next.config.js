/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization for Netlify
  images: {
    unoptimized: true, // Required for static export
  },
  
  // Custom webpack config if needed
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig; 