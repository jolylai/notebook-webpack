---
title: 图片
---

## 图片

[file-loader](https://webpack.js.org/loaders/file-loader/)

- 以 base64 形式打包到 js 文件中，节省一次 http 请求，但会增大 js 文件体积

文件目录结构

```
├── src
│   ├── assets
│   │   └── avatar.png
│   ├── index.js
├── webpack.config.js
├── package.json
└── yarn.lock
```

`/src/assets/`有个`avatar.png`图片，在 `/src/index.js` 模块中引用图片

```js
// index.js
import avator from './assets/avatar.png';

const img = new Image();

img.src = avator;

document.body.append(img);
```

`webpack` 默认是不能处理图片文件，所以我们使用`file-loader`来帮助进行预处理

```bash
yarn add file-loader --dev
```

配置 `webpack.config.js`

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
    ],
  },
};
```

执行打包之后

```
dist/
├── ebf09b50f5e12a7f169c57ae542ee2a3.png
└── main.js
```

`file-loader` 都做了什么操作

- 将`/src/assets/avatar.png`图片文件 打包到`dist/ebf09b50f5e12a7f169c57ae542ee2a3.png`
- 返回图片的路径`ebf09b50f5e12a7f169c57ae542ee2a3.png` 赋值给`avatar`

### 自定义文件名

修改 `webpack.config.js`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:5].[ext]',
          },
        },
      },
    ],
  },
};
```

`name` 的默认值为`'[contenthash].[ext]'`,所以`avatar.png`最终被打包成`ebf09b50f5e12a7f169c57ae542ee2a3.png`,通过更改配置上最终打包出`avatar_ebf09.png`

```
dist/
├── avatar_ebf09.png
└── main.js
```

更多可选[占位符](https://webpack.js.org/loaders/file-loader/#placeholders)

根据不同环境打包出不同的文件名

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name(resourcePath, resourceQuery) {
            // `resourcePath` - `/absolute/path/to/file.js`
            // `resourceQuery` - `?foo=bar`

            if (process.env.NODE_ENV === 'development') {
              return '[path][name].[ext]';
            }

            return '[contenthash].[ext]';
          },
        },
      },
    ],
  },
};
```

### 文件输出

将所有的图片打包到`images` 文件夹下

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        },
      },
    ],
  },
};
```

最终打包结果

```
dist/
├── images
│   └── ebf09b50f5e12a7f169c57ae542ee2a3.png
├── index.html
└── main.js
```

按照不同的规则，把图片归类到不同文件夹下

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: (url, resourcePath, context) => {
            // `resourcePath` is original absolute path to asset
            // `context` is directory where stored asset (`rootContext`) or `context` option

            // To get relative path you can use
            // const relativePath = path.relative(context, resourcePath);

            if (/my-custom-image\.png/.test(resourcePath)) {
              return `other_output_path/${url}`;
            }

            if (/images/.test(context)) {
              return `image_output_path/${url}`;
            }

            return `output_path/${url}`;
          },
        },
      },
    ],
  },
};
```

## url-loader

[url-loader](https://webpack.js.org/loaders/url-loader/)
A loader for webpack which transforms files into base64 URIs.

[Data URLs](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/data_URIs)，即前缀为 data: 协议的 URL，其允许内容创建者向文档中嵌入小文件。
