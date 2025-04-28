/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure static export
  output: 'export',
  // Ensure images are optimized
  images: {
    unoptimized: true,
  },
  // Add trailing slashes to URLs for better SEO
  trailingSlash: true,
  // Remove webpack-specific configuration
  // webpack: (config, { isServer }) => {
  //   // Add custom webpack configuration if needed
  //   return config;
  // },
  // Ensure TypeScript path aliases work correctly
  experimental: {
    // Remove esmExternals which is webpack-specific
    // esmExternals: true,
  },
};

module.exports = nextConfig; 