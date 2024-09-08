/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias["@"] = __dirname;
    return config;
  },
};
