// @ts-check
/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  images: {
    domains: ["ipfs.io"],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  swcMinify: true,
};
