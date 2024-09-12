const path = require("path");

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ocpiojdbxsgjollypfis.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
    minimumCacheTTL: 60,
    // Optional: You can add additional configurations for image optimization here
    // For example:
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
  // Optional: You can add more Next.js configurations here
  // For example:
  // reactStrictMode: true,
  // swcMinify: true,
};
