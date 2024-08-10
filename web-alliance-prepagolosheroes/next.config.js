/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: `/${process.env.NEXT_PUBLIC_ASSET_PREFIX}` || "",
  images: {
    loader: "default",
    path: `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/_next/image`,
  },
};

module.exports = nextConfig;
