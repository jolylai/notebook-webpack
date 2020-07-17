## CSS 文件处理

安装

```bash
yarn add style-loader css-loader -D
```

- [style-loader](https://github.com/webpack-contrib/style-loader):将 CSS 注入到 DOM 中

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

### attributes

Type: Object Default: {}

如果有值，`style-loader` 将会把值赋值到`<style>`或 `<link>` 标签的属性上

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader', options: { attributes: { id: 'id' } } },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
};
```

打包结果

```html
<header>
  <style id="id"></style>
</header>
```

### insert

`Type: String|Function Default: head`

默认`style-loader` 会将 打包生成的`<style>` 或 `<link>` 插入到 `<header>`中最后的位置，如果`<header>` 中已经存在`<style>`, `<style>` 中的代码优先级则会低于

通过自定义选择器（ querySelect），来决定 style 注入到 DOM 中的那个地方

```js
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'body',
            },
          },
          'css-loader',
        ],
      },
    ],
  },
};
```

将 style 注入到 `querySelector('body')`即 `<body>` 的尾部，打包后会生成

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Webpack</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
  </head>
  <body>
    <!-- 打包生成的样式 -->
    <style></style>
  </body>
</html>
```

插入到`<header>` 标签的最顶部

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: function insertAtTop(element) {
                var parent = document.querySelector('head');
                var lastInsertedElement =
                  window._lastElementInsertedByStyleLoader;

                if (!lastInsertedElement) {
                  parent.insertBefore(element, parent.firstChild);
                } else if (lastInsertedElement.nextSibling) {
                  parent.insertBefore(element, lastInsertedElement.nextSibling);
                } else {
                  parent.appendChild(element);
                }

                window._lastElementInsertedByStyleLoader = element;
              },
            },
          },
          'css-loader',
        ],
      },
    ],
  },
};
```

`style-loader` 通过 `<style>` 标签将`CSS` 注入到`DOM` 中

## [css-loader](https://github.com/webpack-contrib/css-loader)

解析 css 文件中的 `@import` 和 `url()` ，会 `import/require()` 后再解析它们。

### url

`Type: Boolean|Function Default: true`

被过滤的 `url()`不会被处理（原封不动的输出）

```js
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          url: (url, resourcePath) => {
            // resourcePath - path to css file

            // Don't handle `img.png` urls
            if (url.includes('img.png')) {
              return false;
            }

            return true;
          },
        },
      },
    ],
  },
};
```

### import

被过滤的 `import`不会被处理（原封不动的输出）

```js
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          import: (parsedImport, resourcePath) => {
            // parsedImport.url - url of `@import`
            // parsedImport.media - media query of `@import`
            // resourcePath - path to css file

            // Don't handle `style.css` import
            if (parsedImport.url.includes('style.css')) {
              return false;
            }

            return true;
          },
        },
      },
    ],
  },
};
```

这里使用到了多个 loader ，loader 的执行顺序默认从右到左，即先执行 `css-loader` 再执行 `style-loader`

## less

安装

```bash
yarn add less less-loader -D
```

使用

```js
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|less)$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
};
```
