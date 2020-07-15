---
title: 由来
order: 1
group:
  title: 模块
---

模块化的开发方式可以提高代码复用率，方便进行代码的管理。通常一个文件就是一个模块，有自己的作用域，只向外暴露特定的变量和函数。目前流行的 js 模块化规范有 CommonJS、AMD、CMD 以及 ES6 的模块系统。

网页越来越像桌面程序，需要一个团队分工协作、进度管理、单元测试等等......开发者不得不使用软件工程的方法，管理网页的业务逻辑。

Javascript 模块化编程，已经成为一个迫切的需求。理想情况下，开发者只需要实现核心的业务逻辑，其他都可以加载别人已经写好的模块。

## 全局变量污染

只要把不同的函数（以及记录状态的变量）简单地放在一起，就算是一个模块。

```js
// a.js
var something = 'cool';
var another = [1, 2, 3];

function add(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}
```

有另一个模块`b.js`

```js
var something = 'awsome';
```

在 HTML`a.js`,`b.js` 同时通过`<script>` 被引入

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Module</title>
    <script src="a.js"></script>
    <script src="b.js"></script>
  </head>
</html>
```

我们生明的变量都在全局作用域中，不同的开发者维护不同的 js 文件，很难保证不和其它 js 文件冲突。

## 命名空间

为了解决全局变量污染的问题，模块写成一个对象，所有的模块成员都放到这个对象里面。

```js
var moduleA = {
  something: 'cool',
  add: function(a, b) {
    return a + b;
  },
  minus: function(a, b) {
    return a - b;
  },
};
```

使用的时候，就是调用这个对象的属性。

```js
moduleA.add(1, 2);
```

但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写。比如，外部代码可以直接改变内部计数器的值。这显然是不被允许的。

```js
moduleA.something = 'awsome';
```

## 闭包

使用"立即执行函数"（Immediately-Invoked Function Expression，IIFE），可以达到不暴露私有成员的目的。是 Javascript 模块的基本写法。

```js
// a.js
var moduleA = (function() {
  var something = 'cool';

  var add = function(a, b) {
    return a + b;
  };

  var minus = function(a, b) {
    return a - b;
  };

  return {
    something: something,
    add: add,
    minus: minus,
  };
})();
```

使用闭包，外部代码无法读取内部的变量。

```js
console.info(moduleA.something); //undefined
```

综上所述，前端需要模块化，并且模块化不光要处理全局变量污染、数据保护的问题，还要很好的解决模块之间依赖关系的维护。
