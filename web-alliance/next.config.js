/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/copec/:path*",
        destination: "http://45.79.17.130:3027/:path*", // Redirige todo lo que vaya a /copec a la aplicación en el puerto 3027
      },
    ];
  },
};

module.exports = nextConfig;
