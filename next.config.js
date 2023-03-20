/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "msavatar1.nexon.net",
        port: "",
        pathname: "/Character/**",
      },
    ],
  },
};

module.exports = nextConfig;
