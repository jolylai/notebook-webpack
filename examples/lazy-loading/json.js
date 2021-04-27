const webpackChunklazy_loading = [
  [
    ['print.js'],
    {
      './src/print.js': (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {},
    },
  ],
];

__webpack_require__.f = {
  j: (chunkid, promises) => {},
};

// object to store loaded and loading chunks
// undefined = chunk not loaded, null = chunk preloaded/prefetched
// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
var installedChunks = {
  main: 0,
};
