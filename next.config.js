/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.notion.so',
      },
      {
        protocol: 'https',
        hostname: '**.gumroad.com',
      },
      {
        protocol: 'https',
        hostname: '**.filepicker.io',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
