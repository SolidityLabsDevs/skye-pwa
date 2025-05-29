/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [];
  },
  async rewrites() {
    return [];
  },
  reactStrictMode: true,
  transpilePackages: [
    'react-icons',
    '@material-tailwind/react',
    '@react-icons/all-files',
    '@heroicons/react/24',
    '@heroicons/react/24/solid',
    '@heroicons/react/24/outline',
    '@fortawesome/react-fontawesome',
  ],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

const withPWA = require('next-pwa')({
  dest: 'public',
  // disable: true,
  disable: process.env.NODE_ENV === 'production' ? false : true,
  // disable: false,
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([[withBundleAnalyzer]], withPWA(nextConfig));
