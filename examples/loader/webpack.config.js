const { resolve } = require('path');
const HtmWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tpl$/,
        use: [
          {
            loader: resolve(__dirname, './loader/tplLoader.js'),
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmWebpackPlugin({
      template: resolve(__dirname, './index.html'),
    }),
  ],
};
