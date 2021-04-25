var __webpack_modules__ = {
  './src/index.js': (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__,
  ) => {
    __webpack_require__.r(__webpack_exports__);
    var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      './src/math.js',
    );
    console.log(
      (0, _math__WEBPACK_IMPORTED_MODULE_0__.add)('hello', 'webpack'),
    );
  },

  './src/math.js': (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__,
  ) => {
    __webpack_require__.r(__webpack_exports__);

    __webpack_require__.d(__webpack_exports__, {
      add: () => /* binding */ add,
    });

    function add(a, b) {
      return a + b;
    }

    //# sourceURL=webpack://externals/./src/math.js?',
  },
};

/**
 *  './src/index.js': {
 *    exports: {}
 *  }
 */
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

__webpack_require__.d = (exports, definition) => {
  for (let key in definition) {
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

__webpack_require__.r = exports => {
  if (typeof Symbol !== undefined && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, {
      value: 'Module',
    });
  }

  Object.defineProperty(exports, '__esModule', { value: true });
};

__webpack_require__.o = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
