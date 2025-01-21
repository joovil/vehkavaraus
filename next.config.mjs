// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  /**
   * @type {import('next').NextConfig}
   */

  const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "uqcnfgb6afellrqu.public.blob.vercel-storage.com",
        },
      ],
    },
    logging: {
      fetches: {
        hmrRefreshes: true,
        fullUrl: true,
      },
    },
  };

  return nextConfig;
};
