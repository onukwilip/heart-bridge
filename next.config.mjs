/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [{ source: "/", destination: "/auth/login", permanent: false }];
  },
};

export default nextConfig;
