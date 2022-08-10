`babel` 是一个 (source code => output code) 的编译器， 总共分为三个阶段：解析，转换，生成。

`babel` 本身不具有任何转化功能(const babel = code => code)，它把转化的功能都分解到一个个 plugin 里面。因此当我们不配置任何插件时，经过 `babel` 的代码和输入是相同的

插件总共分为两种：

- `语法插件`: 在解析这一步就使得 babel 能够解析更多的语法。
- `转译插件`: 在转换这一步把源码转换并输出。这也是我们使用 babel 最本质的需求。

<Alert>
NOTE: transform plugins automatically enable the syntax plugins. So you don't need to specify the syntax plugin if the corresponding transform plugin is used already. 
</Alert>
