/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
 
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
