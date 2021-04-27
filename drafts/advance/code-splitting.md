---
title: 代码分割
nav:
  title: 高级概念
  order: 3
---

## 前言

代码分离能够把代码分离到不同的 `bundle` 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 `bundle`，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

常用的代码分离方法有三种：

- `入口起点`：使用 entry 配置手动地分离代码。
- `防止重复`：使用 Entry dependencies 或者 SplitChunksPlugin 去重和分离 chunk。
- `动态导入`：通过模块的内联函数调用来分离代码。

## 同步加载

安装 lodash

```shell
yarn add lodash
```

在业务代码中使用 lodash

```js
import _ from 'lodash';

_.join(['hello', 'webpack'], ' ');
// ... 此处省略 1M 业务代码
```

使用`npx webpack`进行打包，

```
     Asset       Size  Chunks             Chunk Names
index.html  330 bytes          [emitted]
   main.js    599 KiB    main  [emitted]  main
```

```
dist/
├── index.html
└── main.js
```

### 手动分割

配置

```js
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
```

打包

```
dist/
├── index.html
├── main.js
└── vendors~main.js
```

## 异步加载

无需做任何配置，会自动进行代码分割

```js
const getComponent = () => {
  return import('lodash').then(({ default: { join } }) => {
    const btn = document.createElement('button');
    btn.innerText = join(['hello', 'world'], ' ');
    return btn;
  });
};

getComponent().then(btn => {
  document.body.appendChild(btn);
});
```

打包

```
dist/
├── 0.js  // lodash
├── index.html
└── main.js // 业务代码
```

魔法注释

```js
const getComponent = () => {
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(
    ({ default: { join } }) => {
      const btn = document.createElement('button');
      btn.innerText = join(['hello', 'world'], ' ');
      return btn;
    },
  );
};

getComponent().then(btn => {
  document.body.appendChild(btn);
});
```

打包

```
          Asset       Size          Chunks             Chunk Names
       index.html  330 bytes                  [emitted]
          main.js    109 KiB            main  [emitted]  main
vendors~lodash.js    547 KiB  vendors~lodash  [emitted]  vendors~lodash
```
