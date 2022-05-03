/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/onboarding/landing",
        permanent: true,
      },
    ];
  },
};
