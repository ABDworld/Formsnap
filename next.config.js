/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 🔧 Très important si tes pages sont dans /src/pages
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig;
