/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'walbas-product.s3.us-east-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
     {
        source: '/api/:path*',
        destination: 'http://18.117.9.233:8080/:path*', // Proxy to backend
      }
    ];
  },
};

module.exports = nextConfig;