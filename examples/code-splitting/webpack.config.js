const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/dynamic-import.js',
  // entry: {
  //   index: {
  //     import: './src/index.js',
  //     dependOn: 'shared',
  //   },
  //   another: {
  //     import: './src/another-module.js',
  //     dependOn: 'shared',
  //   },
  //   shared: 'lodash',
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].boundle.js',
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin()],
};
