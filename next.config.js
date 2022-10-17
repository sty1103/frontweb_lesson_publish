/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return {
      afterFiles: [{ source: "/", destination: "/_404/:path*" }],
    };
  },
}

module.exports = nextConfig
