/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ["utfs.io"],
  },
};

module.exports = nextConfig;
