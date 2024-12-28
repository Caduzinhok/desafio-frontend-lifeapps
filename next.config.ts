import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    domains: ['s3-sa-east-1.amazonaws.com'], // Adicione aqui o domínio permitido
  },
};
export default nextConfig;
