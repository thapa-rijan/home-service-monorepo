/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@home-service/shared",
    "@home-service/ui",
    "@home-service/lib",
  ],
};

module.exports = nextConfig;
