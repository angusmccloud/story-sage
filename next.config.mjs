/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/story_sage_frontend",
  output: "export",  // <=== enables static exports
  // reactStrictMode: true,
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
