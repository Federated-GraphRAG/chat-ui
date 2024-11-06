/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    INSTANCE_TYPE: process.env.INSTANCE_TYPE || 'CDC',
  },
};

export default nextConfig;
