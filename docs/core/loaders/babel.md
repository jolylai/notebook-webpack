---
title: Babel
---

## Babel

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

- 语法转换
- 通过 Polyfill 方式在目标环境中添加缺失的特性 (通过 @babel/polyfill 模块)
- 源码转换 (codemods)

## ES6 转 ES5

我们想使用 ECMAScript 的最新特性，但是旧版本的浏览器不支持 ECMAScript 新特性，这时可以借助 babel 将 ES6 语法转成 ES5 语法

安装依赖

```bash
yarn add babel-loader @babel/core -D
```

- `babel-loader` 只是 `babel` 与 `webpack` 的通讯桥梁，这时还需要 `@babel/preset-env` 来进行代码转换
- `@babel/core`: babel 核心库，将代码转成抽象语法树，再将抽象语法树转成代码

配置`webpack.config.js`

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
  ];
}
```

- `exclude: /node_modules/`: `/node_modules/` 下的文件不使用 babel 编译，通常`/node_modules/`下的文件都是已经被编译过了

项目的根路径下创建 `.babelrc` 配置文件

```json
{
  "presets": ["@babel/preset-env"]
}
```

也可以 babel 配置写的 `webpack.config.js` 中，把上面两步合成下面一个配置,但是因为`babel`有很多的配置如果都写在 `webpack.config.js` 中会显得非常臃肿，所以更推荐将 babel 的配置写在`.babelrc`中

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ];
}
```

## polyfill

在比较旧版本的浏览器中并没有内置 `Promise` `WeakMap`，静态方法：`Array.from` `Object.assign` 等，为了打包后的代码能在旧版本浏览器中运行，我们需要自行注入

安装

```bash
yarn add  @babel/preset-env -D
```

配置

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}
```

安装 `corejs`

```shell
yarn add core-js@3

# or

yarn add core-js@2
```

配置`.babelrc`

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3,
        "targets": {
          "chrome": 49,
          "firefox": 64,
          "safari": 10,
          "edge": 13,
          "ios": 10
        }
      }
    ]
  ]
}
```

- `"useBuiltIns": "usage"`: 根据业务代码需求注入 `@babel/polyfill` 里对应的内容
- `targets`: 需要支持到的浏览器的版本

## transform-runtime

> A plugin that enables the re-use of Babel's injected helper code to save on codesize.

为什么使用

所有的 helpers 都会指向 `@babel/runtime` 模块，从而避免

通过`core-js` 或 `@babel/polyfill` 注入 `Promise`, `Map`,会污染全局作用域，当你创建一个库给其他人使用，这时你的运行环境不可控，这将会是一个严重的问题

安装

```shell
yarn add --dev @babel/plugin-transform-runtime

yarn add @babel/runtime
```

`@babel/runtime`会被打包到最终的代码

```js
new Promise();
```

上面的代码会被编译成下面的代码

```js
import _Promise from '@babel/runtime-corejs3/core-js-stable/promise';

new _Promise();
```

配置

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 3,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```
