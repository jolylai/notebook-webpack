/**
 * loadScript function to load a script via script tag
 */

/* webpack/runtime/load script */
(() => {
  // 存放回调
  var inProgress = {};

  var dataWebpackPrefix = 'lazy-loading:';

  /**
   * @param {String}  url
   * @param {Function} done 加载完成后的回调
   * @param {String} key
   */
  const loadScript = (url, done, key, chunkId) => {
    // 已经在加载
    if (inProgress[url]) {
      inProgress[url].push(done);
      return;
    }

    var script, needAttach;

    // 获取页面上的 script
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

    // 创建 scrip
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

    // 初始化回调
    inProgress[url] = [done];

    //
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

    // 超时设定
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
