---
title: 介绍
order: 1
group:
  title: Loader
  order: 1
---

`webpack` 默认只能处理`JavaScript` 文件。使用 `loader` 来预处理文件，这允许你打包除 `JavaScript` 之外的任何静态资源。loader 可以使你在 `import` 或"加载"模块时预处理文件，对模块的源代码进行转换。

- 将文件从不同的语言（如 TypeScript）转换为 `JavaScript`，
- 将内联图像转换为 data URL。
- 直接在 JavaScript 模块中 import CSS 文件！

## 特性

- loader 支持链式传递。能够对资源使用流水线(pipeline)。一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。
- loader 可以是同步的，也可以是异步的。
- loader 运行在 Node.js 中，并且能够执行任何可能的操作。
- loader 接收查询参数。用于对 loader 传递配置。
- loader 也能够使用 options 对象进行配置。
- 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。
- 插件(plugin)可以为 loader 带来更多特性。
- loader 能够产生额外的任意文件。

loader 通过（loader）预处理函数，为 JavaScript 生态系统提供了更多能力。 用户现在可以更加灵活地引入细粒度逻辑，例如压缩、打包、语言翻译和其他更多。

## 使用

### 配置

`module.rules` 允许你在 `webpack` 配置中指定多个 `loader`。 这是展示 `loader` 的一种简明方式，并且有助于使代码变得简洁。同时让你对各个 `loader` 有个全局概览

```js
// webpack.config.js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ],
    },
  ];
}
```

### CLI

你也可以通过 CLI 使用 loader：

```shell
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```

这会对 .jade 文件使用 jade-loader，对 .css 文件使用 style-loader 和 css-loader。

### 内联

可以在 import 语句或任何等效于 "import" 的方式中指定 loader。使用 ! 将资源中的 loader 分开。分开的每个部分都相对于当前目录解析。

```js
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

通过前置所有规则及使用 !，可以对应覆盖到配置中的任意 loader。

选项可以传递查询参数，例如 ?key=value&foo=bar，或者一个 JSON 对象，例如 ?{"key":"value","foo":"bar"}。

<Alert>
尽可能使用 module.rules，因为这样可以减少源码中的代码量，并且可以在出错时，更快地调试和定位 loader 中的问题。
</Alert>

[asset-management](https://webpack.js.org/guides/asset-management/)
