const withPWA = require('next-pwa')

module.exports = withPWA({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    },
    {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  pwa: {
    dest: 'public',
  },
  exportTrailingSlash: true,
})
