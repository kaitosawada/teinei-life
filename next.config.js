/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
  },
  headers: [
    {
      source: "/.well-known/nostr.json",
      headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
    },
  ],
};

module.exports = nextConfig;
