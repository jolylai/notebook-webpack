---
title: 快速上手
order: 1
nav:
  title: 指南
  order: 1
---

## 介绍

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/webpack.png)

`webpack` 是一个现代 `JavaScript` 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

webpack 能做什么

- 代码转换
- 文件优化
- 代码分割
- 模块合并
- 自动刷新
- 代码效验
- 自动发布

## 安装

初始化项目

```bash
mkdir webpack-demo && cd webpack-demo
npm init -y
```

项目中安装 `webpack` `webpack-cli`

```bash
yarn add webpack webpack-cli --dev

# 项目中安装的 webpack 版本号
npx webpack -v
```

项目根目录中创建`webpack.config.js`

```js
module.exports = {
  mode: 'development',
};
```

修改`package.json`，添加打包命令

```json
{
  "scrips": {
    "build": "webpack"
  }
}
```
