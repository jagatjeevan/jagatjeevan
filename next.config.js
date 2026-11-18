module.exports = {
  experimental: {
    agentUpgrade: 'security',
  },
  productionBrowserSourceMaps: true,
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};
