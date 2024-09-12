const path = require("path");

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Ensure the protocol is correct
        hostname: "ocpiojdbxsgjollypfis.supabase.co", // Supabase domain for your images
        pathname: "/storage/v1/object/sign/**", // Ensure the path matches your image URLs
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
};
