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
      {
        protocol: "https",
        hostname: "kssttwnhskxxdczpoxvu.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/boss-banners/**",
      },
    ],
  },
};

module.exports = nextConfig;
