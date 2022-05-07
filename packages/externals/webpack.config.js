const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  output: {
    clean: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  externalsType: 'script',
  externals: {
    lodash: [
      'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js',
      '_',
    ],
  },
  plugins: [new HtmlWebpackPlugin({})],
};
