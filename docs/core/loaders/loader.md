---
title: Loader
group:
  order: 3
---

## 什么是 loader

`webpack` 默认只能处理`JavaScript` 文件。使用 `loader` 来预处理文件，这允许你打包除 `JavaScript` 之外的任何静态资源。

[asset-management](https://webpack.js.org/guides/asset-management/)

## 图片

[file-loader](https://webpack.js.org/loaders/file-loader/)
[url-loader](https://webpack.js.org/loaders/url-loader/)

安装

```bash
yarn add file-loader --dev
```

在 `index.js` 中引入图片

```js
import avator from './2.jpg';

const img = new Image();

img.src = avator;

document.body.append(img);
```

配置 `webpack.config.js`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
};
```

`file-loader` 都做了什么

- 将图片文件

## SourceMap

```js
module.exports = {
  // 开发环境
  devtool: 'cheap-module-eval-source-map',
  // 生产环境
  devtool: 'cheap-module-source-map',
};
```
