const path = require("path");

module.exports = {
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
      "@components": path.resolve(__dirname, "components"),
    };

    // You can also add some logging to check the path aliases during build
    console.log("Webpack Aliases:", config.resolve.alias);

    return config;
  },
};
