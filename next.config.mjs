/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/chef",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=1, stale-while-revalidate=59",
          },
        ],
      },
    ];
  },
  images: {
    domains: ["t4.ftcdn.net", "cdn.filestackcontent.com"],
  },
};

export default nextConfig;
