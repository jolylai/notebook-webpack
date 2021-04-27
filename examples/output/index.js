var math;

/******/ (() => {
  // webpackBootstrap
  /******/ 'use strict';
  /******/ var __webpack_modules__ = {
    /***/ './src/index.js':
      /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "add": () => (/* binding */ add)\n/* harmony export */ });\nfunction add(a, b) {\n  return a + b;\n}\n\n\n//# sourceURL=webpack://math/./src/index.js?',
        );

        /***/
      },

    /******/
  }; // The require scope
  /************************************************************************/
  /******/ /******/ var __webpack_require__ = {}; /* webpack/runtime/define property getters */
  /******/

  /************************************************************************/
  /******/ /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })(); /* webpack/runtime/hasOwnProperty shorthand */
  /******/

  /******/ /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })(); /* webpack/runtime/make namespace object */
  /******/

  /******/ /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = exports => {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module',
        });
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    };
    /******/
  })();

  var __webpack_exports__ = {};

  __webpack_modules__['./src/index.js'](
    0,
    __webpack_exports__,
    __webpack_require__,
  );

  math = __webpack_exports__;
})();
