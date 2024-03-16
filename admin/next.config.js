/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
    ],
  },
/*   async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self';" +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clever-cheetah-42.clerk.accounts.dev https://clerk.serviclick.cl https://arriving-egret-56.clerk.accounts.dev;" +
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com;" +
              "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com data:;" +
              "img-src * data:;" +
              "connect-src 'self'  https://clever-cheetah-42.clerk.accounts.dev https://arriving-egret-56.clerk.accounts.dev https://clerk.serviclick.cl https://api.serviclick.cl;" +
              "worker-src 'self' blob:;",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  }, */
};

module.exports = nextConfig;
