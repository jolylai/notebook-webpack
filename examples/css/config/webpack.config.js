const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: resolve(__dirname, 'src/index.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({}),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
};
