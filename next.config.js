/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'your-secret-key',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/kdsms'
  },
  // Add environment variables to Edge Runtime (middleware)
  experimental: {
    instrumentationHook: true
  },
  // Expose environment variables to Edge Runtime
  serverRuntimeConfig: {
    // Will only be available on the server side
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'your-secret-key',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/kdsms'
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    NODE_ENV: process.env.NODE_ENV,
    APP_NAME: 'KDSMS',
    APP_DESCRIPTION: 'Karimnagar Dairy Sales Management System'
  }
}

module.exports = nextConfig 