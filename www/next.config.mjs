/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
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
    ],
  },
  poweredByHeader: false,
}

export default nextConfig
