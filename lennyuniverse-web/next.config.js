/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Configure static exports
  distDir: 'out', // Specify the output directory explicitly
  
  // Image optimization settings
  images: {
    domains: [
      'images.unsplash.com',
      'm.media-amazon.com',
      'i0.wp.com',
      'lennyuniverse.com'
    ],
    unoptimized: true, // Required for static export
    // Limit image sizes for performance
    deviceSizes: [640, 750, 828, 1080], // Optimized for common screen sizes
    imageSizes: [16, 32, 48, 64, 96], // Smaller thumbnails
  },
  
  // Optimized build settings for Vercel 1.7 vCPU, 3GB RAM
  swcMinify: true, // Use SWC's faster minifier
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console logs in production
  },
  
  // Performance optimizations
  experimental: {
    // Disabled CSS optimization due to compatibility issues
    scrollRestoration: true, // Better scroll handling
  },
  
  // Enable trailingSlash for better static hosting compatibility
  trailingSlash: true,
  
  // Vercel-specific optimizations
  compress: true, // Enable compression
  poweredByHeader: false, // Remove X-Powered-By header for security
  
  // Configure webpack for memory optimization - helps with 3GB constraint
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev) {
      // Split chunks more aggressively to reduce initial load size
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000
      };
    }
    
    return config;
  },
}

module.exports = nextConfig