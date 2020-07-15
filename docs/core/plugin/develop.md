---
title: 插件开发
---

[compiler-hooks](https://webpack.js.org/api/compiler-hooks/)

## Compiler

Compiler 模块是 webpack 的主要引擎，它通过 CLI 传递的所有选项， 或者 Node API，创建出一个 compilation 实例。

```js
// plugins/copyright-webpack-plugin
class CopyrightWebpackPlugin {
  constructor(options) {
    //   用户传进插件的参数
  }

  apply(compiler) {
    //   Compiler 创建的实例
  }
}

module.exports = CopyrightWebpackPlugin;
```

compiler 中常用属性

- `compiler.options`: webpack 配置参数，在`webpack.config.js` 中配置的
- `compiler.hooks`: 钩子函数存放对象
- `compiler.context`: 项目路径, eg: `/Users/laiguolin/Workspace/study/webpack/copyright-webpack-plugin`

## Compiler Hooks

Hooks 可以分成同步钩子(SyncHook) 和异步钩子(AsyncSeriesHook)

**同步钩子(SyncHook)**只支持`tap`一种形式调用

```js
compiler.hooks.compilation.tap('CopyrightWebpackPlugin', compilation => {
  // compilation 创建之后执行
});
```

**异步钩子(AsyncSeriesHook)** 支持三种形式调用

回调形式调用

```js
compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
  compilation.assets['copyright.txt'] = {
    source: function() {
      return 'copyright';
    },
    size: function() {
      return 9;
    },
  };
  //   cb() 必须要被调用
  cb();
});
```

Promise 形式调用

```js
compiler.hooks.emit.tapPromise('CopyrightWebpackPlugin', compilation => {
  // 返回 Promise
  return new Promise(resolve => {
    compilation.assets['copyright.txt'] = {
      source: function() {
        return 'copyrightPromise';
      },
      size: function() {
        return 9;
      },
    };
    resolve();
  });
});
```

你仍然可以使用同步钩子的形式调用

```js
compiler.hooks.emit.tap('CopyrightWebpackPlugin', compilation => {
  compilation.assets['copyright.txt'] = {
    source: function() {
      return 'copyright';
    },
    size: function() {
      return 9;
    },
  };
});
```

## compilation 钩子

Compilation 模块会被 Compiler 用来创建新的 compilation 对象（或新的 build 对象）。 compilation 实例能够访问所有的模块和它们的依赖（大部分是循环依赖）。 它会对应用程序的依赖图中所有模块， 进行字面上的编译(literal compilation)。 在编译阶段，模块会被加载(load)、封存(seal)、优化(optimize)、 分块(chunk)、哈希(hash)和重新创建(restore)。

## 插件使用

```js
const CopyRightWebpackPlugin = require('./plugins/copyright-webpack-plugin');

module.exports = {
  mode: 'development',
  plugins: [new CopyRightWebpackPlugin()],
};
```
