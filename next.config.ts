/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'https://backend-task-manager-app-production.up.railway.app'
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/static/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'https://backend-task-manager-app-production.up.railway.app/',
        pathname: '/static/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
