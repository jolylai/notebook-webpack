const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: resolve(__dirname, 'src/index.js'),
    other: resolve(__dirname, 'src/other.js'),
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].boundle.js',
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    splitChunks: {
      chunks: 'all',
      // automaticNameDelimiter: '-',
      //   minSize: 20000,
      //   minRemainingSize: 0,
      //   maxSize: 0,
      //   minChunks: 1,
      //   maxAsyncRequests: 30,
      //   maxInitialRequests: 30,
      //   enforceSizeThreshold: 50000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        common: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
