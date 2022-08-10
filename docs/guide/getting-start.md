# 快速开始

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
pnpm init
```

项目中安装 `webpack` `webpack-cli`

```bash
pnpm add webpack webpack-cli --dev
```

##

项目根目录中创建 `webpack.config.js`

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

## module chunk bundle

![](https://image-1255652541.cos.ap-shanghai.myqcloud.com/uPic/image-20200518210532171.png)

- 对于一份同逻辑的代码，当我们手写下一个一个的文件，它们无论是 ESM 还是 commonJS 或是 AMD，他们都是 module ；
- 当我们写的 module 源文件传到 webpack 进行打包时，webpack 会根据文件引用关系生成 chunk 文件，webpack 会对这个 chunk 文件进行一些操作；
- webpack 处理好 chunk 文件后，最后会输出 bundle 文件，这个 bundle 文件包含了经过加载和编译的最终源文件，所以它可以直接在浏览器中运行。

一般来说一个 chunk 对应一个 bundle，比如上图中的 utils.js -> chunks 1 -> utils.bundle.js；但也有例外，比如说上图中，我就用 MiniCssExtractPlugin 从 chunks 0 中抽离出了 index.bundle.css 文件。

module，chunk 和 bundle 其实就是同一份逻辑代码在不同转换场景下的取了三个名字：

我们直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle

## 构建流程

从启动到结束会依次执行以下三大步骤：

- 初始化流程：从配置文件和 Shell 语句中读取与合并参数，并初始化需要使用的插件和配置插件等执行环境所需要的参数
- 编译构建流程：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理
- 输出流程：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统

#### Reference

- [DDFE](https://github.com/DDFE/DDFE-blog)
- [Webpack](https://webpack.docschina.org/guides/code-splitting/)
