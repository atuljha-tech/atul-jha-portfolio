import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Allow base64 data URIs - no remote patterns needed
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig
