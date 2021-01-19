---
title: CSS
order: 3
---

## CSS 文件

```
├── src
│   ├── assets
│   │   └── avatar.png
│   ├── index.js
│   ├── style.css
├── webpack.config.js
├── package.json
└── yarn.lock
```

创建`style.css` 样式文件

```css
body {
  background-color: slateblue;
}
.avatar {
  width: 60px;
  height: 60px;
}
```

修改`index.js`，给图片添加 CSS 样式

```js
import avator from './assets/avatar.png';
import './style.css';

const img = new Image();

img.src = avator;
img.classList.add('avatar');

document.body.append(img);
```

安装

```bash
yarn add style-loader css-loader -D
```

`webpack.config.js`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

这里使用到了多个 loader ，loader 的执行顺序默认从右到左，即先执行 `css-loader` 在将结果交给`style-loader` 处理

### [style-loader](https://github.com/webpack-contrib/style-loader)

将 CSS 注入到 DOM 中

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

### [css-loader](https://github.com/webpack-contrib/css-loader)

解析 css 文件中的 `@import` 和 `url()` ，如同 `import/require()` 。

**url**

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

**import**

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

**CSS Module**

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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'less-loader',
        ],
      },
    ],
  },
};
```

## Sass

安装

```bash
yarn add less sass-loader node-sass sass -D
```

- `sass-loader`: 将`Sass/SCSS` 文件编译为 `css` 文件

使用

```js
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|less)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
};
```

## postcss

给 css 属性加浏览器厂商前缀

```shell
yarn add postcss-loader autoprefixer -D
```

根路径下创建`postcss.config.js`

```js
module.exports = {
  plugins: [require('autoprefixer')],
};
```

`webpack.config.js` 配置

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },
};
```
