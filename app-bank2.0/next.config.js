/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [ 'https://www.flaticon.com' ]
  },
}

module.exports = nextConfig