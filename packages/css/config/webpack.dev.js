const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: resolve(__dirname, '../src/index.js'),
  output: {
    clean: true,
  },
  module: {
    rules: [],
  },
  plugins: [new HtmlWebpackPlugin({})],
};
