/** @type {import('next').NextConfig} */
const nextConfig = {
  remotePatterns: [
      {
        protocol: "https",
        hostname: "https://www.image2url.com/",
      },
    ],
  },
};

export default nextConfig;
