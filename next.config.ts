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
        source: '/products/:path*',
        destination: `${process.env.PRODUCTS_API_BASE_URL}/products/:path*`,
      },
      {
        source: '/user/:path*',
        destination: `${process.env.USER_API_BASE_URL}/user/:path*`,
      },
      {
        source: '/bids',
        destination: `${process.env.BIDS_API_BASE_URL}/bids`,
      },
    ];
  },
};

export default nextConfig;