const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: resolve(__dirname, 'index.html'),
  //   }),
  // ],
  // externals: {
  //   lodash: {
  //     root: '_', // indicates global variable
  //   },
  // },
};
