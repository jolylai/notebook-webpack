---
title: 预置依赖
---

## ProvidePlugin

使用 ProvidePlugin 后，能够在 webpack 编译的每个模块中，通过访问一个变量来获取一个 package。

`index.js`

```js
const foo = _.join(['hello', 'world'], ' ');

console.log(foo);
```

`webpack.config.js`

```js
  const path = require('path');
+ const webpack = require('webpack');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
+   plugins: [
+     new webpack.ProvidePlugin({
+       _: 'lodash',
+     }),
+   ],
  };
```

如果你遇到了至少一处用到 `_` 变量的模块实例，那请你将 lodash package 引入进来，并将其提供给需要用到它的模块。

```js
import _ from 'lodash';

const foo = _.join(['hello', 'world'], ' ');

console.log(foo);
```

运行我们的构建脚本

```
     Asset       Size  Chunks             Chunk Names
   main.js    598 KiB    main  [emitted]  main
```

我们只用到 lodash 中的 join ，而 lodash 却被全部打包到 main.js 中

`index.js`

```js
const foo = join(['hello', 'world'], ' ');

console.log(foo);
```

`webpack.config.js`

```js
  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new webpack.ProvidePlugin({
-       _: 'lodash',
+       join: ['lodash', 'join'],
      }),
    ],
  };
```
