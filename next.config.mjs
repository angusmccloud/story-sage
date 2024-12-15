/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/story-sage",
  output: "export",  // <=== enables static exports
  // reactStrictMode: true,
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
