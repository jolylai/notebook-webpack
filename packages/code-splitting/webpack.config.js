const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/lazy-loading.js',
  },
  output: {
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin()],
};
