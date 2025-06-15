// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'example.com',
        pathname: '/**',
      },
    ],
  },
}