/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/copec",
  assetPrefix: `/${process.env.NEXT_PUBLIC_ASSET_PREFIX}` || "",
};

export default nextConfig;
