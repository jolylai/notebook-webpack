---
title: ES6 Module
---

## export

```js
const a = 1;

function add(a, b) {
  return a + b;
}
export { a, add };
```

```js
// a.js
const a = 1;
module.exports = a;

// index.js
const a = require('./a');

console.log(a);
```

通过 webpack 打包后

```js
// a.js
const a = 1;

module.exports = a;

// index.js
const a = __webpack_require__('./src/a.js');

console.log(a);
```

ES6

```js
// a.js
const a = 1;

export default a;

// index.js
import a from './a';

console.log('a: ', a);
```

```js
// a.js
__webpack_require__.r(__webpack_exports__);
const a = 1;

__webpack_exports__['default'] = a;

//  index.js
__webpack_require__.r(__webpack_exports__);
var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./src/a.js');
console.log('a: ', _a__WEBPACK_IMPORTED_MODULE_0__['default']);
```
