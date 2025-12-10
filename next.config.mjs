/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blob.v0.app',
      },
    ],
    unoptimized: true,
  },
  // Ensure nodemailer works in serverless environment
  experimental: {
    serverComponentsExternalPackages: ['nodemailer'],
  },
  turbopack: {},
}

export default nextConfig
