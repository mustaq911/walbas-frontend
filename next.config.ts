/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'walbas-product.s3.us-east-2.amazonaws.com', // For customer/admin images
        pathname: '/**', // Allows all paths
      },
      {
        protocol: 'https',
        hostname: 'walbaseproduct.s3.us-east-2.amazonaws.com', // Kept in case still needed
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/products/:path*', // Proxy for products API
        destination: 'http://3.148.182.60:8081/products/:path*', // API server
      },
    ];
  },
};

module.exports = nextConfig;