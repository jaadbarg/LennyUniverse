/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
}

module.exports = nextConfig