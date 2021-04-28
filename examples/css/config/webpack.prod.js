const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: resolve(__dirname, '../src/index.js'),
  output: {
    path: resolve(__dirname, '../dist'),
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
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          // For webpack@4
          // test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};
