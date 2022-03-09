module.exports = {
  reactStrictMode: true,
  externals: {
    FileReader: "FileReader",
  },

  // webpack5: true,
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       fs: false,
  // path: false,
  // os: false,
  //     };
  //   }
  //   return config;
  // },
};
