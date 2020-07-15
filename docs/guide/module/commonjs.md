---
title: CommonJS
order: 2
---

Node.js 应用由模块组成，采用 CommonJS 模块规范，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

在浏览器环境下，没有模块也不是特别大的问题，毕竟网页程序的复杂性有限；但是在服务器端，一定要有模块，与操作系统和其他应用程序互动，否则根本没法编程。

## 概述

### 模块导出

CommonJS 规范规定，每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口。加载某个模块，其实是加载该模块的 module.exports 属性。

```js
var something = 'cool';

function add(a, b) {
  return a + b;
}

module.exports.something = something;
module.exports.add = add;
```

### 模块加载

```js
var a = require('./a.js');

a.something; // 'cool'
a.add(1, 2); // 3
```

CommonJS 模块的特点如下。

- 所有代码都运行在模块作用域，不会污染全局作用域。
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
- 模块加载的顺序，按照其在代码中出现的顺序。

## module 对象

每个模块内部，都有一个 module 对象，代表当前模块。它有以下属性。

- `module.id` 模块的识别符，通常是带有绝对路径的模块文件名。
- `module.filename` 模块的文件名，带有绝对路径。
- `module.loaded` 返回一个布尔值，表示模块是否已经完成加载。
- `module.parent` 返回一个对象，表示调用该模块的模块。
- `module.children` 返回一个数组，表示该模块要用到的其他模块。
- `module.exports` 表示模块对外输出的值。

```js
// a.js
var join = require('lodash/join');

var foo = 1;
function add(a, b) {
  return a + b;
}

module.exports.foo = foo;
module.exports.join = join;
module.exports.add = add;

console.log(module);
```

执行这个文件，命令行会输出如下信息。

```shell
$ node src/a.js
<ref *1> Module {
  id: '.',
  path: '/Users/laiguolin/Workspace/study/webpack/library/src',
  exports: { foo: 1, join: [Function: join], add: [Function: add] },
  parent: null,
  filename: '/Users/laiguolin/Workspace/study/webpack/library/src/a.js',
  loaded: false,
  children: [
    Module {
      id: '/Users/laiguolin/Workspace/study/webpack/library/node_modules/lodash/join.js',
      path: '/Users/laiguolin/Workspace/study/webpack/library/node_modules/lodash',
      exports: [Function: join],
      parent: [Circular *1],
      filename: '/Users/laiguolin/Workspace/study/webpack/library/node_modules/lodash/join.js',
      loaded: true,
      children: [],
      paths: [Array]
    }
  ],
  paths: [
    '/Users/laiguolin/Workspace/study/webpack/library/src/node_modules',
    '/Users/laiguolin/Workspace/study/webpack/library/node_modules',
    '/Users/laiguolin/Workspace/study/webpack/node_modules',
    '/Users/laiguolin/Workspace/study/node_modules',
    '/Users/laiguolin/Workspace/node_modules',
    '/Users/laiguolin/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ]
}
```

### module.exports

module.exports 属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取 module.exports 变量。

```js
var EventEmitter = require('events').EventEmitter;
module.exports = new EventEmitter();

setTimeout(function() {
  module.exports.emit('ready');
}, 1000);
```

上面模块会在加载后 1 秒后，发出 ready 事件。其他文件监听该事件，可以写成下面这样。

```js
var a = require('./a');
a.on('ready', function() {
  console.log('module a is ready');
});
```

### exports

为了方便，Node 为每个模块提供一个 exports 变量，指向 module.exports。这等同在每个模块头部，有一行这样的命令。

```js
var exports = module.exports;
```

造成的结果是，在对外输出模块接口时，可以向 exports 对象添加方法。

```js
exports.area = function(r) {
  return Math.PI * r * r;
};

exports.circumference = function(r) {
  return 2 * Math.PI * r;
};
```

注意，不能直接将 exports 变量指向一个值，因为这样等于切断了 exports 与 module.exports 的联系。

```js
exports = function(x) {
  console.log(x);
};

// 等价

var exports = module.exports;
exports = function(x) {
  console.log(x);
};

exports !== module.exports; // true
```

上面这样的写法是无效的，因为 exports 不再指向 module.exports 了。

## require

`require` 命令的基本功能是，读入并执行一个 JavaScript 文件，然后返回该模块的 exports 对象。如果没有发现指定模块，会报错。

### 加载规则

require 命令用于加载文件，后缀名默认为.js。

```js
var foo = require('foo');
//  等同于
var foo = require('foo.js');
```

根据参数的不同格式，require 命令去不同路径寻找模块文件。

（1）如果参数字符串以“/”开头，则表示加载的是一个位于绝对路径的模块文件。比如，require('/home/marco/foo.js')将加载/home/marco/foo.js。

（2）如果参数字符串以“./”开头，则表示加载的是一个位于相对路径（跟当前执行脚本的位置相比）的模块文件。比如，require('./circle')将加载当前脚本同一目录的 circle.js。

（3）如果参数字符串不以“./“或”/“开头，则表示加载的是一个默认提供的核心模块（位于 Node 的系统安装目录中），或者一个位于各级 node_modules 目录的已安装模块（全局安装或局部安装）。

举例来说，脚本/home/user/projects/foo.js 执行了 require('bar.js')命令，Node 会依次搜索以下文件。

- `/usr/local/lib/node/bar.js`
- `/home/user/projects/node_modules/bar.js`
- `/home/user/node_modules/bar.js`
- `/home/node_modules/bar.js`
- `/node_modules/bar.js`

这样设计的目的是，使得不同的模块可以将所依赖的模块本地化。

（4）如果参数字符串不以“./“或”/“开头，而且是一个路径，比如 require('example-module/path/to/file')，则将先找到 example-module 的位置，然后再以它为参数，找到后续路径。

（5）如果指定的模块文件没有发现，Node 会尝试为文件名添加.js、.json、.node 后，再去搜索。.js 件会以文本格式的 JavaScript 脚本文件解析，.json 文件会以 JSON 格式的文本文件解析，.node 文件会以编译后的二进制文件解析。

（6）如果想得到 require 命令加载的确切文件名，使用 require.resolve()方法。

### 目录的加载规则

通常，我们会把相关的文件会放在一个目录里面，便于组织。这时，最好为该目录设置一个入口文件，让 require 方法可以通过这个入口文件，加载整个目录。

在目录中放置一个 package.json 文件，并且将入口文件写入 main 字段。下面是一个例子。

```js
// package.json
{
  "name": "some-library",
  "main": "./lib/some-library.js"
}
```

require 发现参数字符串指向一个目录以后，会自动查看该目录的 package.json 文件，然后加载 main 字段指定的入口文件。如果 package.json 文件没有 main 字段，或者根本就没有 package.json 文件，则会加载该目录下的 index.js 文件或 index.node 文件。

### 模块的缓存

第一次加载某个模块时，Node 会缓存该模块。以后再加载该模块，就直接从缓存取出该模块的 module.exports 属性。

```js
require('./example.js');
require('./example.js').message = 'hello';
require('./example.js').message;
// "hello"
```

上面代码中，连续三次使用 require 命令，加载同一个模块。第二次加载的时候，为输出的对象添加了一个 message 属性。但是第三次加载的时候，这个 message 属性依然存在，这就证明 require 命令并没有重新加载模块文件，而是输出了缓存。

如果想要多次执行某个模块，可以让该模块输出一个函数，然后每次 require 这个模块的时候，重新执行一下输出的函数。

所有缓存的模块保存在 require.cache 之中，如果想删除模块的缓存，可以像下面这样写。

```js
// 删除指定模块的缓存
delete require.cache[moduleName];

// 删除所有模块的缓存
Object.keys(require.cache).forEach(function(key) {
  delete require.cache[key];
});
```

注意，缓存是根据绝对路径识别模块的，如果同样的模块名，但是保存在不同的路径，require 命令还是会重新加载该模块。

## 模块的加载机制

CommonJS 模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个例子。

下面是一个模块文件 lib.js。

```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
```

上面代码输出内部变量 counter 和改写这个变量的内部方法 incCounter。

然后，加载上面的模块。

```js
// main.js
var counter = require('./lib').counter;
var incCounter = require('./lib').incCounter;

console.log(counter); // 3
incCounter();
console.log(counter); // 3
```

上面代码说明，counter 输出以后，lib.js 模块内部的变化就影响不到 counter 了。

### require 的内部处理流程

require 命令是 CommonJS 规范之中，用来加载其他模块的命令。它其实不是一个全局命令，而是指向当前模块的 module.require 命令，而后者又调用 Node 的内部命令 `Module._load`。

```js
Module._load = function(request, parent, isMain) {
  // 1. 检查 Module._cache，是否缓存之中有指定模块`
  // 2. 如果缓存之中没有，就创建一个新的 Module 实例
  // 3. 将它保存到缓存
  // 4. 使用 module.load() 加载指定的模块文件，
  // 读取文件内容之后，使用 module.compile() 执行文件代码
  // 5. 如果加载/解析过程报错，就从缓存删除该模块
  // 6. 返回该模块的 module.exports
};
```

上面的第 4 步，采用 module.compile()执行指定模块的脚本，逻辑如下。

```js
Module.prototype._compile = function(content, filename) {
  // 1. 生成一个 require 函数，指向 module.require
  // 2. 加载其他辅助方法到 require
  // 3. 将文件内容放到一个函数之中，该函数可调用 require
  // 4. 执行该函数
};
```

上面的第 1 步和第 2 步，require 函数及其辅助方法主要如下。

- `require()`： 加载外部模块
- `require.resolve()`：将模块名解析到一个绝对路径
- `require.main`：指向主模块
- `require.cache`：指向所有缓存的模块
- `require.extensions`：根据文件的后缀名，调用不同的执行函数

  一旦 require 函数准备完毕，整个所要加载的脚本内容，就被放到一个新的函数之中，这样可以避免污染全局环境。该函数的参数包括 require、module、exports，以及其他一些参数。

```js
(function (exports, require, module, **filename, **dirname) {
// YOUR CODE INJECTED HERE!
});
```

`Module._compile` 方法是同步执行的，所以 Module.\_load 要等它执行完成，才会向用户返回 module.exports 的值。

## CommonJS 实现

符合 CommonJS 规范的模块时，无外乎就是使用了 require 、 exports 、 module 三个东西

- [CommonJS 规范](https://javascript.ruanyifeng.com/nodejs/module.html)
