---
title: 模块
---

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/js-module.png)

## 模块化编程

在模块化编程中，开发者将程序分解成离散功能块(discrete chunks of functionality)，并称之为**模块**。

每个模块具有比完整程序更小的接触面，使得校验、调试、测试轻而易举。 精心编写的模块提供了可靠的抽象和封装界限，使得应用程序中每个模块都具有条理清楚的设计和明确的目的。

## CommonJS

Node.js 应用由模块组成，采用 CommonJS 模块规范，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

```js
// math.js
const add = (a, b) => {
  return a + b;
};

const minus = (a, b) => {
  return a - b;
};

module.exports = { add, minus };
// index.js
const math = require('./math.js');
```

## AMD

AMD 是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

CommonJS 规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。

```js
require(['math'], function(math) {
  math.add(2, 3);
});
```

## ES6（推荐）

webpack 2 支持原生的 ES6 模块语法，意味着你可以无须额外引入 babel 这样的工具，就可以使用 import 和 export。但是注意，如果使用其他的 ES6+ 特性，仍然需要引入 babel。

具名导出

```js
// math.js
export const add = (a, b) => {
  return a + b;
};

export const minus = (a, b) => {
  return a - b;
};

// index.js
import { add, minus } from './math.js';
```

默认导出

```js
// a.js
const a = 1;
export default a;

// index.js
import a from './a.js';
```

动态加载

```js
import('lodash').then(({ default: _ }) => {
  // Do something with lodash (a.k.a '_')...
  _.join(['Hello', 'Webpack'], ' ');
});
```

## 样式文件

css/sass/less 文件中的 @import 语句。

```css
@import './index.css';

body {
  background-image: url();
}
```

## HTML 文件

样式(url(...))或 HTML 文件(`<img src=...>`)中的图片链接(image url)

```html
<img src="..." />
```

## webpack 模块

webpack 通过 loader 可以支持各种语言和预处理器编写模块。loader 描述了 webpack 如何处理 非 JavaScript(non-JavaScript) _模块_，并且在 bundle 中引入这些依赖。

## 参考文章

- [模块方法](https://www.webpackjs.com/api/module-methods/)
- [ES6 Module](https://es6.ruanyifeng.com/#docs/module)
- [CommonJS](https://javascript.ruanyifeng.com/nodejs/module.html#toc1)
