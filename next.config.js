/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.ibb.co"],
  },
  env: {
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    SECRET: process.env.SECRET,
  },
};

module.exports = nextConfig;
