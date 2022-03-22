const { resolve } = require('path');
const webpack = require('webpack');

class ConsoleLogPlugin {
  apply(compiler) {
    compiler.hooks.run.tap('ConsoleLogPlugin', compilation => {
      console.log('The webpack build process is starting!');
    });
  }
}

module.exports = {
  mode: 'development',
  entry: resolve(__dirname, 'src/index.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'boundle.js',
  },
  plugins: [
    new ConsoleLogPlugin(),
    new webpack.ProvidePlugin({ _add: ['lodash-es', 'add'] }),
  ],
};
