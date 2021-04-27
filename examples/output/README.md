---
title: Output
nav:
  title: 指南
  path: /guides
group:
  title: 核心概念
  path: /core
---

```js
var __webpack_modules__ = {
  './src/index.js': (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__,
  ) => {
    'use strict';
    // 用户写的代码
  },
};
```

## 代码加载

```js
// 模块缓存
var __webpack_module_cache__ = {};

// 加载模块方法
function __webpack_require__(moduleId) {
  // 检查模块是否在缓存中
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  // Create a new module (and put it into the cache)
  var module = (__webpack_module_cache__[moduleId] = {
    // no module.id needed
    // no module.loaded needed
    exports: {},
  });

  // Execute the module function
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

  // Return the exports of the module
  return module.exports;
}

/************************************************************************/
/* webpack/runtime/compat get default export */
(() => {
  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = module => {
    var getter =
      module && module.__esModule ? () => module['default'] : () => module;
    __webpack_require__.d(getter, { a: getter });
    return getter;
  };
})();

/* webpack/runtime/define property getters */
(() => {
  // define getter functions for harmony exports
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

/* webpack/runtime/hasOwnProperty shorthand */
(() => {
  __webpack_require__.o = (obj, prop) =>
    Object.prototype.hasOwnProperty.call(obj, prop);
})();

/* webpack/runtime/make namespace object */
(() => {
  // define __esModule on exports
  __webpack_require__.r = exports => {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };
})();
```

```js
var __webpack_module_cache__ = {
  // no module.id needed
  id: '',
  // no module.loaded needed
  loaded: false,
  exprots: {},
};
```

```js
__webpack_require__.r(__webpack_exports__);

var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./src/math.js');

var _math__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
  _math__WEBPACK_IMPORTED_MODULE_0__,
);

var __WEBPACK_REEXPORT_OBJECT__ = {};
for (const __WEBPACK_IMPORT_KEY__ in _math__WEBPACK_IMPORTED_MODULE_0__)
  if (__WEBPACK_IMPORT_KEY__ !== 'default')
    __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () =>
      _math__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__];

__webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
```

## umd

UniversalModuleDefinition(通用模块定义)

```js
function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if (typeof define === 'function' && define.amd) define([], factory);
  else if (typeof exports === 'object') exports['math'] = factory();
  else root['math'] = factory();
}
```
