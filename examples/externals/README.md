## 前言

不要讲依赖包打包到最终的 bundle 中

```js
var __webpack_modules__ = {
  lodash: module => {
    module.exports = _;
  },
};
```
