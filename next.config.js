const path = require("path");

module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "components"),
      "@": path.resolve(__dirname), // If using "@/*" for base path
    };
    return config;
  },
};
