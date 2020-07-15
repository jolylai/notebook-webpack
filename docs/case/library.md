---
title: Library 打包
---

## Library 使用

Library 会有以下四种用法

ES2015 module import:

```js
import * as webpackNumbers from 'webpack-numbers';
// ...
webpackNumbers.wordToNum('Two');
```

CommonJS module require:

```js
const webpackNumbers = require('webpack-numbers');
// ...
webpackNumbers.wordToNum('Two');
```

AMD module require:

```js
require(['webpackNumbers'], function(webpackNumbers) {
  // ...
  webpackNumbers.wordToNum('Two');
});
```

consumer(使用者) 还可以通过一个 script 标签来加载和使用此 library：

```html
<!DOCTYPE html>
<html>
  ...
  <script src="https://unpkg.com/webpack-numbers"></script>
  <script>
    // ...
    // 全局变量
    webpackNumbers.wordToNum('Five');
    // window 对象中的属性
    window.webpackNumbers.wordToNum('Five');
    // ...
  </script>
</html>
```

注意，我们还可以通过以下配置方式，将 library 暴露为：

global 对象中的属性，用于 Node.js。
this 对象中的属性。

<Alert>
注意，下面示例代码中的 _entry_return_ 是入口点返回的值。在包本身中，它是webpack从入口点生成的函数的输出。
</Alert>

```js
module.exports = {
  entry: './src/index.js',
  output: {
    library: 'MyLibrary',
    libraryTarget: 'var',
  },
};
```

`libraryTarget: 'var'` （默认值），加载库时，入口点的返回值将分配给一个变量

```js
var MyLibrary = _entry_return_;

// In a separate script...
MyLibrary.doSomething();
```

如果`output.libary` 不为非空字符串，

```js
# ES Modlue
import library form 'library'

# CMD
const library = require('library')


# AMD
require(['library'], function(){

})

<script src='library.js'></script>

library
```

### `script` 便签使用

`webpack.config.js`

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'this.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'library',
  },
};
```

`index.html` 引入，`library`,`this.library`,`window.library`,都可以拿到

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Libary</title>
    <script src="./dist/this.js"></script>
  </head>
  <body>
    <script>
      console.log(library);
      console.log(this.library);
      console.log(window.library);
    </script>
  </body>
</html>
```

"var" | "assign" | "this" | "window" | "self" | "global" | "commonjs" | "commonjs2" | "commonjs-module" | "amd" | "amd-require" | "umd" | "umd2" | "jsonp" | "system"
