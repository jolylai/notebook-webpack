function __webpack_require__() {}

__webpack_require__.f = {};

(() => {
  var installedChunks = {
    main: 0,
  };
  __webpack_require__.f.j = (chunkId, promises) => {};
})();

/**
 * 加载额外的 chunk
 */
__webpack_require__.loadAdditionalChunks = chunkId => {
  const fileKeys = Object.keys(__webpack_require__.f);
  const promises = fileKeys.reduce((promises, key) => {
    __webpack_require__.f[key](chunkId, promises);
    return promises;
  }, []);
  return Promise.all(promises);
};
