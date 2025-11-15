/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      // Strapi Cloud images
      { 
        protocol: 'https', 
        hostname: 'best-treasure-2ffc2f3cd9.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
