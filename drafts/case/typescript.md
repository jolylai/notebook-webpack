---
title: TypeScript
---

```shell
yarn add ts-loader typescript -D
```

`webpack.config.js`

```js
module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
};
```

在根路径下创建`tsconfig.json`

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "module": "es6",
    "target": "es5",
    "allowJs": true
  }
}
```

安装包时需要安装响应的类型检测文件,[TypeSearch](http://microsoft.github.io/TypeSearch/)

```shell
yarn add lodash
yarn add @types/lodash -D
```
