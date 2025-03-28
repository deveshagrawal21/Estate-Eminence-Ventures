/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    unoptimized: false, // Let Vercel optimize images
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
      "www.estate-eminence-ventures.com",
      "estate-eminence-ventures.com",
      "estateeminence.vercel.app",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },
  // For Vercel deployment
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://www.estate-eminence-ventures.com",
  },
  // Proper domain setup
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
  // Redirect from non-www to www
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "estate-eminence-ventures.com",
          },
        ],
        destination: "https://www.estate-eminence-ventures.com",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
