const HtmWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const yaml = require('yamljs');
const json5 = require('json5');

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
        generator: {
          filename: 'static/[hash][ext][query]',
        },
      },
      {
        test: /.xml$/,
        exclude: /node_modules/,
        use: ['xml-loader'],
      },
      {
        test: /.(csv|tsv)$/,
        exclude: /node_modules/,
        use: ['csv-loader'],
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /.json5$/,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
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
