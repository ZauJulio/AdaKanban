/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    API_USER: process.env.API_USER,
    API_PASSWORD: process.env.API_PASSWORD,
  },
};

module.exports = nextConfig;
