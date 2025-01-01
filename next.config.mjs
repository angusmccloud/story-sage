/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? "/story_sage_frontend" : "",
  output: "export",  // <=== enables static exports
  // reactStrictMode: true,
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
