---
title: 图片
order: 2
---

## [file-loader](https://webpack.js.org/loaders/file-loader/)

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

在 `/src/index.js` 模块中引用`/src/assets/avatar.png`图片

```js
// index.js
import avator from './assets/avatar.png';

const img = new Image();

img.src = avator;

document.body.append(img);
```

如果个不做任何配置直接打包的话，会报一下错误

```shell
ERROR in ./src/assets/avatar.png 1:0
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
(Source code omitted for this binary file)
 @ ./src/avatar.js 1:0-41 2:24-30 4:10-16
```

这是因为`webpack` 默认是不能处理图片文件，所以我们使用`file-loader`来帮助进行预处理

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

`avatar.png` 经过打包之后文件名变成了`ebf09b50f5e12a7f169c57ae542ee2a3.png`, 在开发的时候可能我们需要经过打包之后还是`avatar.png`，这样才能一眼认出事哪个文件，便于调试

修改 `webpack.config.js` 配置文件

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
};
```

打包后的文件如下

```
dist/
├── avatar_ebf09.png
└── main.js
```

`name` 的默认值为`'[contenthash].[ext]'`,所以没有配置`name` 的话打包后文件名默认会被改成 hash 值，如：`avatar.png`最终被打包成`ebf09b50f5e12a7f169c57ae542ee2a3.png`,通过更改配置可以打包出你想要的文件名。更多可选[占位符](https://webpack.js.org/loaders/file-loader/#placeholders)

根据不同的环境打包出不同的文件名

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
              return '[name]_[hash:5].[ext]';
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

## [url-loader](https://webpack.js.org/loaders/url-loader/)

> A loader for webpack which transforms files into base64 URIs.

`url-loader` 功能类似于 `file-loader`，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。

```shell
yarn add url-loader -D
```

`webpack.config.js`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'url-loader',
      },
    ],
  },
};
```

打包后

```
Asset       Size     Chunks             Chunk Names
main.js   18.7 KiB    main  [emitted]  main
```

图片文件没了，只剩`main.js`一个文件，而且大小达到京人的`18.7k`,我们的才写了几行的代码怎么会有这么大呢，点开`main.js` 文件查看，会有一个以`data:image/png;base64`开头的一长串字符，这个就是`url-loader`把`avatar.png`图片转成了[Data URLs](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/data_URIs)，即前缀为 data: 协议的 URL，其允许内容创建者向文档中嵌入小文件。

可以看出`file-loader`将文件 已 base64 URIs 形式打包进了 js 文件中，这样浏览器在请求的时候可以减少 HTTP 请求数量，但是也带来了 js 文件体积变大的问题

最佳实践就是设置一个阀值，在文件大小小于阀值的时候才打包到 js 文件中，而在大于阀值的时候将文件单独打包，如同`file-loader`形式

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'url-loader',
        options: {
          limit: 1024,
        },
      },
    ],
  },
};
```

打包后

```
                               Asset       Size  Chunks             Chunk Names
ebf09b50f5e12a7f169c57ae542ee2a3.png   10.5 KiB          [emitted]
                             main.js   4.72 KiB    main  [emitted]  main
```
