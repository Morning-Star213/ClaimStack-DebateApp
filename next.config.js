/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  // Increase body size limit for file uploads
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
  // Environment variables that should be available on the client
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
}

module.exports = nextConfig

