const dotenv = require('dotenv-flow');
const { join } = require('path');

const dotenvConfig = dotenv.config({
  node_env: process.env.NEXT_PUBLIC_APP_ENV,
  silent: true,
});

/** @type {import('next').NextConfig} */
module.exports = {
  env: dotenvConfig.parsed,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-60598b7c52b34387840b4e8b2a63336c.r2.dev',
        pathname: '/images/**',
      },
    ],
  },
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: join(__dirname, '../../'),
  },
  pageExtensions: ['page.tsx', 'api.ts'],
  transpilePackages: ['app-constants', 'schemas', 'types'],
};
