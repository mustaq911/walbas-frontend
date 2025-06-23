/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'walbaseproduct.s3.us-east-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};