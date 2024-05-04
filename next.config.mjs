/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  images: {
    domains: ["t4.ftcdn.net", "cdn.filestackcontent.com"],
  },
};

export default nextConfig;
