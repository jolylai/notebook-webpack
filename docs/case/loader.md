## 前言

所谓 loader 只是一个导出为函数的 JavaScript 模块。

```js
/**
 *
 * @param {string|Buffer} content Content of the resource file
 * @param {object} [map] SourceMap data consumable by https://github.com/mozilla/source-map
 * @param {any} [meta] Meta data, could be anything
 * @return {string|Buffer}
 */
module.exports = function webpackLoader(content, map, meta) {
  // code of your webpack loader
};
```

content 为上一个 loader 产生的结果或者资源文件。

## 同步 Loader

如果是单个处理结果，可以在同步模式中直接返回。

```js
module.exports = function webpackLoader(content, map, meta) {
  // code of your webpack loader
  return content;
};
```

如果有多个处理结果，则必须调用 this.callback()。

```js
module.exports = function webpackLoader(content, map, meta) {
  this.callback(
            // 无法装换原内容时的Error
        err: Error || null,
        // 装换后的的内容，如上述的source
        content: string | Buffer,
        // 用于通过装换后的内容得出原内容的Source Map，方便调试
        // 我们了解到，SourceMap我们只是会在开发环境去使用，于是就会变成可控制的，
        // webpack也提供了this.sourceMap去告诉是否需要使用sourceMap，
        // 当然也可以使用loader的option来做判断，如css-loader
        sourceMap?: SourceMap,
        // 如果本次转换同时生成ast语法树，也可以将这个ast返回，方便后续loader需要复用该ast，这样可以提高性能
        abstractSyntaxTree? AST
  );
};
```

## 异步 loader

在异步模式中，必须调用 this.async()，来指示 loader runner 等待异步结果，它会返回 this.callback() 回调函数，随后 loader 必须返回 undefined 并且调用该回调函数。

```js
module.exports = function webpackLoader(content, map, meta) {
  const callback = this.async();

  setTimeout(() => {
    callback();
  }, 1000);
};
```

## 获取 loader 的 options

```js
const loaderUtils = require('loader-utils');
module.exports = function(source) {
  // 获取用户为当前Loader传入的options
  console.log(loaderUtils.getOptions(this));
  return source;
};
```

## 返回结果
