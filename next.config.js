/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors during builds (optional - remove if you want to keep type checking)
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: [
      'localhost',
      // Add your storage domains
      'your-s3-bucket.s3.amazonaws.com',
      'your-project.supabase.co',
      // Social media domains for oEmbed
      'i.ytimg.com',
      'cdn.tiktok.com',
      'scontent.cdninstagram.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Environment variables that should be available on the client
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
}

module.exports = nextConfig

