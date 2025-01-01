
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/story_sage_frontend",
  assetPrefix: "/story_sage_frontend/",
  output: "exports",  // <=== enables static exports
  // reactStrictMode: true,
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
