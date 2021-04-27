/* webpack/runtime/load script */
(() => {
  // 加载中
  var inProgress = {};
  var dataWebpackPrefix = 'lazy-loading:';
  // loadScript function to load a script via script tag
  /**
   * @param {String}  url
   * @param {Function} done 加载完成后的回调
   * @param {String} key
   */
  __webpack_require__.l = (url, done, key, chunkId) => {
    if (inProgress[url]) {
      inProgress[url].push(done);
      return;
    }
    var script, needAttach;
    if (key !== undefined) {
      var scripts = document.getElementsByTagName('script');
      for (var i = 0; i < scripts.length; i++) {
        var s = scripts[i];
        if (
          s.getAttribute('src') == url ||
          s.getAttribute('data-webpack') == dataWebpackPrefix + key
        ) {
          script = s;
          break;
        }
      }
    }
    if (!script) {
      needAttach = true;
      script = document.createElement('script');

      script.charset = 'utf-8';
      script.timeout = 120;
      if (__webpack_require__.nc) {
        script.setAttribute('nonce', __webpack_require__.nc);
      }
      script.setAttribute('data-webpack', dataWebpackPrefix + key);
      script.src = url;
    }
    inProgress[url] = [done];
    var onScriptComplete = (prev, event) => {
      // avoid mem leaks in IE.
      script.onerror = script.onload = null;
      clearTimeout(timeout);
      var doneFns = inProgress[url];
      delete inProgress[url];
      script.parentNode && script.parentNode.removeChild(script);
      doneFns && doneFns.forEach(fn => fn(event));
      if (prev) return prev(event);
    };
    var timeout = setTimeout(
      onScriptComplete.bind(null, undefined, {
        type: 'timeout',
        target: script,
      }),
      120000,
    );
    script.onerror = onScriptComplete.bind(null, script.onerror);
    script.onload = onScriptComplete.bind(null, script.onload);
    needAttach && document.head.appendChild(script);
  };
})();

__webpack_require__.r(__webpack_exports__);
var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
  /*! lodash */ 'lodash',
);
var lodash__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
  lodash__WEBPACK_IMPORTED_MODULE_0__,
);

function component() {
  const btn = document.createElement('button');

  btn.innerText = 'Click Me';

  btn.onclick = function() {
    __webpack_require__
      .e(/*! import() | print */ 'print')
      .then(
        __webpack_require__.bind(
          __webpack_require__,
          /*! ./print */ './src/print.js',
        ),
      )
      .then(module => {
        const print = module.default;

        print();
      });
  };

  return btn;
}

document.body.appendChild(component());

// object to store loaded and loading chunks
// undefined = chunk not loaded, null = chunk preloaded/prefetched
// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
var installedChunks = {
  main: 0,
};

__webpack_require__.f.j = (chunkId, promises) => {
  // JSONP chunk loading for javascript
  var installedChunkData = __webpack_require__.o(installedChunks, chunkId)
    ? installedChunks[chunkId]
    : undefined;
  if (installedChunkData !== 0) {
    // 0 means "already installed".

    // a Promise means "currently loading".
    if (installedChunkData) {
      promises.push(installedChunkData[2]);
    } else {
      // all chunks have JS
      // setup Promise in chunk cache
      var promise = new Promise(
        (resolve, reject) =>
          (installedChunkData = installedChunks[chunkId] = [resolve, reject]),
      );
      promises.push((installedChunkData[2] = promise));

      // start chunk loading
      var url = __webpack_require__.p + __webpack_require__.u(chunkId);
      // create error before stack unwound to get useful stacktrace later
      var error = new Error();
      var loadingEnded = event => {
        if (__webpack_require__.o(installedChunks, chunkId)) {
          installedChunkData = installedChunks[chunkId];
          if (installedChunkData !== 0) installedChunks[chunkId] = undefined;
          if (installedChunkData) {
            var errorType =
              event && (event.type === 'load' ? 'missing' : event.type);
            var realSrc = event && event.target && event.target.src;

            error.name = 'ChunkLoadError';
            error.type = errorType;
            error.request = realSrc;
            installedChunkData[1](error);
          }
        }
      };
      __webpack_require__.l(url, loadingEnded, 'chunk-' + chunkId, chunkId);
    }
  }
};

// define __esModule on exports
__webpack_require__.r = exports => {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  }
  Object.defineProperty(exports, '__esModule', { value: true });
};

__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  default: () => __WEBPACK_DEFAULT_EXPORT__,
});

console.log(
  'The print.js module has loaded! See the network tab in dev tools...',
);

const __WEBPACK_DEFAULT_EXPORT__ = () => {
  console.log('Button Clicked: Here ');
};
