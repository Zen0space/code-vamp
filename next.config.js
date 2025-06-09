/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Remove distDir for Netlify Functions support
  // distDir: 'dist', // This prevents API routes from working
  
  // Image optimization for Netlify
  images: {
    unoptimized: true,
  },
  
  // Custom webpack config if needed
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig; 