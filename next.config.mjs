/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
      },
      {
        protocol: "https",
        hostname: "letsenhance.io",
      },

      {
        protocol: "https",
        hostname: "elt.uz",
      },
    ],
  },
};

export default nextConfig;
