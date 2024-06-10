/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'dev.yapsody.events',
      },
      {
        protocol: 'https',
        hostname: 'stg-img.yapsody.events',
      },
      {
        protocol: 'https',
        hostname: 'img.yapsody.events',
      },
    ],
  },
};

module.exports = nextConfig;
