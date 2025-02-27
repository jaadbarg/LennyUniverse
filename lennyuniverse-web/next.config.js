/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Configure static exports
  distDir: 'out', // Specify the output directory explicitly
  images: {
    domains: [
      'images.unsplash.com',
      'm.media-amazon.com',
      'i0.wp.com',
      'lennyuniverse.com'
    ],
    unoptimized: true, // Required for static export
  },
  swcMinify: true,
  // Enable trailingSlash for better static hosting compatibility
  trailingSlash: true,
}

module.exports = nextConfig