/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ './src/info.tpl':
      /*!**********************!*\
  !*** ./src/info.tpl ***!
  \**********************/
      /***/ () => {
        eval(
          'throw new Error("Module parse failed: Unexpected token (9:24)\\nFile was processed with these loaders:\\n * ./loader/tplLoader.js\\nYou may need an additional loader to handle the result of these loaders.\\n|   });\\n| }\\n>       return tplReplace(<ol>\\n|   <li>{{ name }}</li>\\n|   <li>{{ age }}</li>");\n\n//# sourceURL=webpack://loader/./src/info.tpl?',
        );

        /***/
      },

    /***/ './src/index.js':
      /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        'use strict';
        eval(
          "__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _info_tpl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./info.tpl */ \"./src/info.tpl\");\n/* harmony import */ var _info_tpl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_info_tpl__WEBPACK_IMPORTED_MODULE_0__);\n\nconsole.log('tpl: ', (_info_tpl__WEBPACK_IMPORTED_MODULE_0___default()));\n\n// const str = tpl({ name: 'Kian', age: 18 });\n// console.log('str: ', str);\n\n\n//# sourceURL=webpack://loader/./src/index.js?",
        );

        /***/
      },

    /******/
  }; // The module cache
  /************************************************************************/
  /******/ /******/ var __webpack_module_cache__ = {}; // The require function
  /******/

  /******/ /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ if (__webpack_module_cache__[moduleId]) {
      /******/ return __webpack_module_cache__[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    }); // Execute the module function
    /******/

    /******/ /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__,
    ); // Return the exports of the module
    /******/

    /******/ /******/ return module.exports;
    /******/
  } /* webpack/runtime/compat get default export */
  /******/

  /************************************************************************/
  /******/ /******/ (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = module => {
      /******/ var getter =
        module && module.__esModule
          ? /******/ () => module['default']
          : /******/ () => module;
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })(); /* webpack/runtime/define property getters */
  /******/

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
  })(); // startup // Load entry module
  /******/

  /************************************************************************/
  /******/ /******/ /******/ __webpack_require__('./src/index.js');
  /******/ // This entry module used 'exports' so it can't be inlined
  /******/
})();