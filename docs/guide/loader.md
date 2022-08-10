# loader

`webpack` 默认只能处理`JavaScript` 文件。使用 `loader` 来预处理文件，这允许你打包除 `JavaScript` 之外的任何静态资源。loader 可以使你在 `import` 或"加载"模块时预处理文件，对模块的源代码进行转换。

- 将文件从不同的语言（如 TypeScript）转换为 `JavaScript`，
- 将内联图像转换为 data URL。
- 直接在 JavaScript 模块中 import CSS 文件！

在你的应用程序中，有两种使用 loader 的方式：

- 配置方式（推荐）：在 **webpack.config.js** 文件中指定 loader。
- 内联方式：在每个 import 语句中显式指定 loader。

## 配置方式（推荐）

在 **webpack.config.js** 文件中 [module.rules](https://webpack.docschina.org/configuration/module/#modulerules) 允许你在 `webpack` 配置中指定多个 `loader`。 这是展示 `loader` 的一种简明方式，并且有助于使代码变得简洁。同时让你对各个 `loader` 有个全局概览

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
```

loader 从右到左（或从下到上）地取值(evaluate)/执行(execute)，取决于数组写法格式。

- 最后的 loader 最早调用，将会传入原始资源内容。
- 中间的 loader 执行时，会传入前一个 loader 传出的结果。
- 第一个 loader 最后调用，期望值是传出 JavaScript 和 source map（可选）。

在上面的示例中，从 sass-loader 开始执行，然后继续执行 css-loader，最后以 style-loader 为结束。

## 内联方式

可以在 import 语句或任何等效于 "import" 的方式中指定 loader。使用 ! 将资源中的 loader 分开。分开的每个部分都相对于当前目录解析。

```javascript
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

通过为内联 import 语句添加前缀，可以覆盖 [配置](https://webpack.docschina.org/configuration) 中的所有 loader, preLoader 和 postLoader

```javascript
// 使用 ! 前缀，将禁用所有已配置的 normal loader(普通 loader)
import Styles from '!style-loader!css-loader?modules!./styles.css';

// 使用 !! 前缀，将禁用所有已配置的 loader（preLoader, loader, postLoader）
import Styles from '!!style-loader!css-loader?modules!./styles.css';

// 使用 -! 前缀，将禁用所有已配置的 preLoader 和 loader，但是不禁用 postLoaders
import Styles from '-!style-loader!css-loader?modules!./styles.css';
```

选项可以传递查询参数，例如 ?key=value&foo=bar，或者一个 JSON 对象，例如 ?{"key":"value","foo":"bar"}。

## 高级用法

#### 查询参数

```javascript
 /* config.module.rule('vue-style') */
      {
        test: /\.vue$/,
        resourceQuery: /type=style/,
        sideEffects: true
      },
```

#### OneOf

```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /inline/, // foo.css?inline
            use: 'url-loader',
          },
          {
            resourceQuery: /external/, // foo.css?external
            use: 'file-loader',
          },
        ],
      },
    ],
  },
};
```

```javascript
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').oneOf('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              /* config.module.rule('pug').oneOf('pug-vue').use('pug-plain-loader') */
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').oneOf('pug-template') */
          {
            use: [
              /* config.module.rule('pug').oneOf('pug-template').use('raw') */
              {
                loader: 'raw-loader'
              },
              /* config.module.rule('pug').oneOf('pug-template').use('pug-plain-loader') */
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
```

## 编写 loader

```javascript
// 导出一个函数，source为webpack传递给loader的文件源内容
module.exports = function(source) {
  const content = doSomeThing2JsString(source);

  // 如果 loader 配置了 options 对象，那么this.query将指向 options
  const options = this.query;

  // 可以用作解析其他模块路径的上下文
  console.log('this.context');

  /*
   * this.callback 参数：
   * error：Error | null，当 loader 出错时向外抛出一个 error
   * content：String | Buffer，经过 loader 编译后需要导出的内容
   * sourceMap：为方便调试生成的编译后内容的 source map
   * ast：本次编译生成的 AST 静态语法树，之后执行的 loader 可以直接使用这个 AST，进而省去重复生成 AST 的过程
   */
  this.callback(null, content); // 异步
  return content; // 同步
};

/**
 * See the webpack docs for more information about loaders:
 * https://webpack.js.org/contribute/writing-a-loader
 */

module.exports = function loader(source) {
  const { loaders, resource, request, version, webpack } = this;
  console.log('env-loader');
  const newSource = `
	/**
	 * env-loader
	 *
	 * Resource Location: ${resource}
	 * Loaders chained to module: ${JSON.stringify(loaders)}
	 * Loader API Version: ${version}
	 * Is this in "webpack mode": ${webpack}
	 * This is the users request for the module: ${request}
	 */
	/**
	 * Original Source From Loader
	 */
	${source}`;

  return newSource;
};
```

函数中的 this 作为上下文会被 webpack 填充，因此我们不能将 loader 设为一个箭头函数
函数中有异步操作或同步操作，异步操作通过 this.callback 返回，返回值要求为 string 或者 Buffer

- [ ] 传参 options
- [ ] 同步 Loader
- [ ] 异步 Loader
- [ ] this.callback()
- [ ] 异步处理
- [ ] 使用场景
- [ ] 多个 loader 一同使用
- [ ] resolveLoader

## 特性

- loader 支持链式传递。能够对资源使用流水线(pipeline)。一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。
- loader 可以是同步的，也可以是异步的。
- loader 运行在 Node.js 中，并且能够执行任何可能的操作。
- loader 接收查询参数。用于对 loader 传递配置。
- loader 也能够使用 options 对象进行配置。
- 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。
- 插件(plugin)可以为 loader 带来更多特性。
- loader 能够产生额外的任意文件。

loader 通过（loader）预处理函数，为 JavaScript 生态系统提供了更多能力。 用户现在可以更加灵活地引入细粒度逻辑，例如压缩、打包、语言翻译和其他更多。
