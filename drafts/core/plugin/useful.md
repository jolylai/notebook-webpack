---
title: 常用插件
nav:
  title: 核心概念
  order: 2
group:
  order: 4
  title: 插件
---

## html-webpack-plugin

该插件将为你生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包。

```bash
yarn add html-webpack-plugin -D
```

`webpack.config.js` 配置，[更多配置](https://github.com/jantimon/html-webpack-plugin#configuration)

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js',
  },
  plugins: [new HtmlWebpackPlugin()],
};
```

生成包含下面代码的 `dist/index.html` 文件

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```

## clean-webpack-plugin

```shell
yarn add clean-webpack-plugin -D
```

`webpack.config.js` 配置

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [new CleanWebpackPlugin()],
};
```
