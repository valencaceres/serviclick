/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    WEB_PRODUCTS: process.env.WEB_PRODUCTS || '',
    API_KEY: process.env.API_KEY || '',
    API_URL: process.env.API_URL
  },
  images: {
    remotePatterns: [
      {
        hostname: "ethic.es",
        protocol: "https",
      },

      {
        hostname: "png.pngtree.com",
        protocol: "https",
      },
      {
        hostname: "img.clerk.com",
        protocol: "https",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  poweredByHeader: false,
}

export default nextConfig
