/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  async headers() {
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
  },
};
export default config;
