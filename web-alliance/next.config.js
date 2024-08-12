/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/prepago-los-heroes/:path*",
        destination: "http://45.79.17.130:3011/:path*",
      },
      {
        source: "/bancochile/:path*",
        destination: "http://45.79.17.130:3026/:path*",
      },
      {
        source: "/copec/:path*",
        destination: "http://45.79.17.130:3027/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
