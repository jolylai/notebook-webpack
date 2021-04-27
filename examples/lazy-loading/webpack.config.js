const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin()],
  externals: {
    lodash: '_',
  },
};
