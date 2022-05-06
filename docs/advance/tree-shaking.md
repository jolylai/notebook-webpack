---
title: Tree Shaking
---

## 前言

`Tree shaking` 是一个通常用于描述移除 `JavaScript` 上下文中的未引用代码(dead-code) 行为。

它依赖于 ES2015 中的 `import` 和 `export` 语句，用来检测代码模块是否被导出、导入，且被 `JavaScript` 文件使用。
使用`require` 和 `module.exports` 不支持`Tree shaking`

在现代 `JavaScript` 应用程序中，我们使用模块打包(如 webpack 或 Rollup)将多个 `JavaScript` 文件打包为单个文件时自动删除未引用的代码。这对于准备预备发布代码的工作非常重要，这样可以使最终文件具有简洁的结构和最小化大小。

ES6 module 静态引入，编译时引入

Common 动态引入，执行时引入

只有 ES6 module 才能静态分析，实现 Tree Shaking

## 配置

```js
// index.js
import { add } from './math';

add(1, 2);

// math.js
export const add = (a, b) => {
  return a + b;
};

export const minus = (a, b) => {
  return a - b;
};
```

有`index.js` 和`math.js`两个文件，在`math.js` 中有`add` 和`minus` 两个方法，而在`index.js`中只使用了`add`方法，我们希望 webpack 打包的时候直接去除掉 `minus` 这些未引用的代码，以得到最小的最终代码包

```js
// webpack.config.js

module.exports = {
  mode: 'development',
  optimization: {
    usedExports: true,
  },
};
```

sideEffects is much more effective since it allows to skip whole modules/files and the complete subtree.

If no direct export from a module flagged with no-sideEffects is used, the bundler can skip evaluating the module for side effects."
