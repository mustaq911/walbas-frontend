/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'walbas-product.s3.us-east-2.amazonaws.com',
        pathname: '/**',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/products/:path*',
        destination: 'http://3.148.182.60:8080/products/:path*',
      },
      {
        source: '/user/:path*',
        destination: 'http://18.117.9.233:8080/user/:path*',
      },
       {
        source: '/bids',
        destination: 'http://18.117.9.233:8080/bids/:path*',
      },
    ];
  },
};

module.exports = nextConfig;