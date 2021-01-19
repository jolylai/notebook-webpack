## Presets

官方插件集

- @babel/preset-env
- @babel/preset-flow
- @babel/preset-react
- @babel/preset-typescript

## @babel/preset-env

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}
```

### targets

`string | Array<string> | { [string]: string }, defaults to {}.`

定义项目要支持的环境

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "> 0.25%, not dead"
      }
    ]
  ]
}
```

所要支持的最低环境版本对象

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": "58",
          "ie": "11"
        }
      }
    ]
  ]
}
```

### useBuiltIns

配置如何处理 polyfills

| useBuiltIns | Description |
| ----------- | ----------- |
| usage       | Title       |
| entry       | Text        |
| false       | (默认值)    |

`@babel/polyfill` 从 7.4.0 之后被废弃

```bash
yarn add core-js@3

# or

yarn add core-js@2
```

`useBuiltIns: 'entry'`

最佳实践
安装

```bash
yarn add @babel/runtime
yarn add -D @babel/preset-env @babel/plugin-transform-runtime
```

配置

```json
// .babelrc.js
(module.exports = {
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": false, // 默认值，可以不写
        "helpers": true, // 默认，可以不写
        "regenerator": false, // 通过 preset-env 已经使用了全局的 regeneratorRuntime, 不再需要 transform-runtime 提供的 不污染全局的 regeneratorRuntime
        "useESModules": true // 使用 es modules helpers, 减少 commonJS 语法代码
      }
    ]
  ],
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false, // 模块使用 es modules ，不使用 commonJS 规范
        "useBuiltIns": "usage" // 默认 false, 可选 entry , usage
      }
    ]
  ]
})
```

## JSX

安装

```shell
yarn add @babel/preset-react -D
```

`@babel/preset-react` 插件集包含以下插件

- `@babel/plugin-syntax-jsx`
- `@babel/plugin-transform-react-jsx`
- `@babel/plugin-transform-react-display-name`

配置`.babelrc`

```shell
{
  "presets": ["@babel/preset-react"]
}
```
