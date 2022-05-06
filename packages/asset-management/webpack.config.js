const HtmWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node-modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    new HtmWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash:8].css',
    }),
  ],
};
