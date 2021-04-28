---
title: lazy loading 懒加载
nav:
  title: 指南
  path: /guides
group:
  title: 高级概念
  path: /advance
---

## 前言

**懒加载**(lazy loading)是一种将资源标识为非阻塞(非关键)并仅在需要时加载这些资源的策略。它可以缩短关键呈现路径的长度，从而减少页面加载时间。

```
.
├── package.json
├── src
│   ├── index.js
│   └── print.js
└── webpack.config.js
```

```js
// src/print.js
console.log(
  'The print.js module has loaded! See the network tab in dev tools...',
);

export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
};
```

```js
// index.js
import _ from 'lodash';

function component() {
  const element = document.createElement('div');
  const button = document.createElement('button');
  const br = document.createElement('br');

  button.innerHTML = 'Click me and look at the console!';
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.appendChild(br);
  element.appendChild(button);

  // Note that because a network request is involved, some indication
  button.onclick = e =>
    import(/* webpackChunkName: "print" */ './print').then(module => {
      const print = module.default;

      print();
    });

  return element;
}

document.body.appendChild(component());
```

`index.js`中核心代码

```js
button.onclick = e =>
  import(/* webpackChunkName: "print" */ './print').then(module => {
    const print = module.default;

    print();
  });
```

这段代码会被 webpack 打包成以下代码

```js
btn.onclick = function() {
  __webpack_require__
    .e('print')
    .then(__webpack_require__.bind(__webpack_require__, './src/print.js'))
    .then(module => {
      const print = module.default;

      print();
    });
};
```

```js
__webpack_require__.f = {};
// This file contains only the entry chunk.
// The chunk loading function for additional chunks
__webpack_require__.e = chunkId => {
  return Promise.all(
    Object.keys(__webpack_require__.f).reduce((promises, key) => {
      __webpack_require__.f[key](chunkId, promises);
      return promises;
    }, []),
  );
};
```

```js
(() => {
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

    // install a JSONP callback for chunk loading
    var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      var [chunkIds, moreModules, runtime] = data;
      // add "moreModules" to the modules object,
      // then flag all "chunkIds" as loaded and fire callback
      var moduleId,
        chunkId,
        i = 0;
      for (moduleId in moreModules) {
        if (__webpack_require__.o(moreModules, moduleId)) {
          __webpack_require__.m[moduleId] = moreModules[moduleId];
        }
      }
      if (runtime) var result = runtime(__webpack_require__);
      if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
      for (; i < chunkIds.length; i++) {
        chunkId = chunkIds[i];
        if (
          __webpack_require__.o(installedChunks, chunkId) &&
          installedChunks[chunkId]
        ) {
          installedChunks[chunkId][0]();
        }
        installedChunks[chunkIds[i]] = 0;
      }
    };

    var chunkLoadingGlobal = (self['webpackChunklazy_loading'] =
      self['webpackChunklazy_loading'] || []);
    chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
    chunkLoadingGlobal.push = webpackJsonpCallback.bind(
      null,
      chunkLoadingGlobal.push.bind(chunkLoadingGlobal),
    );
  };
})();
```

## 加载 script

```js
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
```

<Alert>
注意，在ES6模块上使用import()时，必须引用.default属性，因为它是解析承诺时将返回的实际模块对象。
</Alert>

## preload

preload(预加载)：当前导航下可能需要资源

## prefetch

```js
import(/* webpackPrefetch: true */ './path/to/LoginModal.js');
```

这会生成 <link rel="prefetch" href="login-modal-chunk.js"> 并追加到页面头部，指示着浏览器在闲置时间预取 login-modal-chunk.js 文件。

```html
<link rel="prefetch" as="script" href="/src_print_js.js" />
```

prefetch(预获取)：将来某些导航下可能需要的资源
