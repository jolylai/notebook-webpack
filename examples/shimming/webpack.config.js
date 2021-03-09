const { resolve } = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

console.log('process.cwd(): ', process.cwd());

module.exports = {
  mode: 'development',
  entry: resolve(__dirname, 'src/index.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'boundle.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
  ],
};
