const { resolve } = require('path');
const webpack = require('webpack');

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
