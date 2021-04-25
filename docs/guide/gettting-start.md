---
title: 快速上手
order: 1
nav:
  title: 指南
  order: 1
---

## 介绍

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/webpack.png)

`webpack` 是一个现代 `JavaScript` 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

webpack 能做什么

- 代码转换
- 文件优化
- 代码分割
- 模块合并
- 自动刷新
- 代码效验
- 自动发布

## 安装

初始化项目

```bash
mkdir webpack-demo && cd webpack-demo
npm init -y
```

项目中安装 `webpack` `webpack-cli`

```bash
yarn add webpack webpack-cli --dev

# 项目中安装的 webpack 版本号
npx webpack -v
```

项目根目录中创建`webpack.config.js`

```js
module.exports = {
  mode: 'development',
};
```

修改`package.json`，添加打包命令

```json
{
  "scrips": {
    "build": "webpack"
  }
}
```

```js
(() => {
  'use strict';
  var __webpack_modules__ = {
    './src/index.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      eval(
        "__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math */ \"./src/math.js\");\n\n\nconsole.log((0,_math__WEBPACK_IMPORTED_MODULE_0__.add)('hello', 'webpack'));\n\n\n//# sourceURL=webpack://externals/./src/index.js?",
      );
    },

    './src/math.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      eval(
        '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "add": () => /* binding */ add\n/* harmony export */ });\nfunction add(a, b) {\n  return a + b;\n}\n\n\n//# sourceURL=webpack://externals/./src/math.js?',
      );
    },
  };
  var __webpack_module_cache__ = {};

  function __webpack_require__(moduleId) {
    if (__webpack_module_cache__[moduleId]) {
      return __webpack_module_cache__[moduleId].exports;
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });

    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  (() => {
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
        }
      }
    };
  })();

  (() => {
    __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
  })();

  (() => {
    __webpack_require__.r = exports => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module',
        });
      }
      Object.defineProperty(exports, '__esModule', { value: true });
    };
  })();
  __webpack_require__('./src/index.js');
})();
```
