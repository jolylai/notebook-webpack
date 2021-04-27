---
title: 模块热替换
---

模块热替换(HMR - hot module replacement)功能会在应用程序运行过程中，替换、添加或删除 模块，而无需重新加载整个页面。

## 开启

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    hotOnly: true,
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
    }),
    new webpack.HotModuleReplacememtPlugin(),
  ],
};
```

```js
// 如果开启模块热替换
if (module.hot) {
  module.hot.accept('./print.js', function() {
    // 如果 ./print.js 文件发生改变着执行以下代码
    console.log('Accepting the updated printMe module!');
    printMe();
  });
}
```

## HMR 加载样式

借助于 style-loader，使用模块热替换来加载 CSS 实际上极其简单。此 loader 在幕后使用了 module.hot.accept，在 CSS 依赖模块更新之后，会将其 patch(修补) 到 `<style>` 标签中。可以查看[源码](https://github.com/webpack-contrib/style-loader/blob/master/src/index.js)

```js
 const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: ['style-loader', 'css-loader'],
+       },
+     ],
+   },
    plugins: [
       // 对于 CleanWebpackPlugin 的 v2 versions 以下版本，使用 new CleanWebpackPlugin(['dist/*'])
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement',
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```
