/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure output directory for static export
  distDir: 'out',
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