/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "images.clerk.dev"
      },{
        protocol: 'https',
        hostname: "www.gravatar.com"
      }
    ]
  }
}

module.exports = nextConfig
