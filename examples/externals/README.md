---
title: externals 外部扩展
nav:
  title: 指南
  path: /guides
group:
  title: 高级概念
  path: /advance
---

## 前言

不要讲依赖包打包到最终的 bundle 中

```js
var __webpack_modules__ = {
  lodash: module => {
    module.exports = _;
  },
};
```
