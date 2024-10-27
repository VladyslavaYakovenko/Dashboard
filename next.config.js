/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.(jpe?g|png|gif|woff|woff2|otf|eot|ttf)(\?[a-z0-9=.]+)?$/,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 1000,
            name: "public/fonts/[name].[ext]",
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        // test: /\.(js|ts)x?$/,
        // for webpack 5 use
        and: [/\.(js|ts)x?$/],
      },

      use: ["@svgr/webpack"],
    });

    return config;
  },

  images: {
    domains: [
      "random.imagecdn.app",
      "images.unsplash.com",
      "fastly.picsum.photos",
      "loremflickr.com",
    ],
  },

  sassOptions: {
    includePaths: [
      path.join(__dirname, "./src/styles"),
      path.join(__dirname, "./src/styles/*"),
    ],
  },
};

module.exports = nextConfig;
