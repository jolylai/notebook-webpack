---
title: 底层原理
---

## 读取文件内容

创建`bundler.js`

```js
const fs = require('fs');

const moduleAnalyser = filename => {
  const content = fs.readFileSync(filename, 'utf-8');
  console.log('content: ', content);
};

moduleAnalyser('./src/index.js');
```

## AST

安装[babel-parser](https://babeljs.io/docs/en/babel-parser)

```shell
yarn add @babel/parser -D
```

将代码转换成抽象语法树（AST）

```js
const fs = require('fs');
const parser = require('@babel/parser');

const moduleAnalyser = filename => {
  const content = fs.readFileSync(filename, 'utf-8');
  const ast = parser.parse(content, {
    sourceType: 'module',
  });
  console.log('ast: ', ast.params.body);
};

moduleAnalyser('./src/index.js');
```

执行`bundler.js` 查看

```shell
$ node bundler.js
ast:  [
  Node {
    type: 'ImportDeclaration',
    start: 0,
    end: 20,
    loc: SourceLocation { start: [Position], end: [Position] },
    specifiers: [ [Node] ],
    source: Node {
      type: 'StringLiteral',
      start: 14,
      end: 19,
      loc: [SourceLocation],
      extra: [Object],
      value: './a'
    }
  },
  Node {
    type: 'ExpressionStatement',
    start: 22,
    end: 44,
    loc: SourceLocation { start: [Position], end: [Position] },
    expression: Node {
      type: 'CallExpression',
      start: 22,
      end: 43,
      loc: [SourceLocation],
      callee: [Node],
      arguments: [Array]
    }
  }
]
```

## 获取依赖

```shell
yarn add @babel/traverse -D
```

获取文件中的所有依赖

```js
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const moduleAnalyser = filename => {
  const content = fs.readFileSync(filename, 'utf-8');
  const ast = parser.parse(content, {
    sourceType: 'module',
  });

  const dependences = [];

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependences.push(node.source.value);
    },
  });
  console.log('dependences: ', dependences);
};

moduleAnalyser('./src/index.js');
```

## 代码转换

```shell
yarn add @babel/core @babel/preset-env -D
```

将 AST 转化成 es5 代码

```js
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const moduleAnalyser = filename => {
  const content = fs.readFileSync(filename, 'utf-8');
  const ast = parser.parse(content, {
    sourceType: 'module',
  });

  const dependences = {};

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      const dirname = path.dirname(filename);
      const newFile = `./${path.join(dirname, node.source.value)}`;
      dependences[node.source.value] = newFile;
    },
  });

  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env'],
  });
  // console.log("dependences: ", dependences);
  console.log('code: ', code);
};

moduleAnalyser('./src/index.js');
```

最终转成成的代码

```js
'use strict';

var _a = _interopRequireDefault(require('./a'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

console.log('a: ', _a['default']);
```

## 依赖图谱

任何时候，一个文件依赖于另一个文件，webpack 就把此视为文件之间有 依赖关系 。这使得 webpack 可以接收非代码资源(non-code asset)（例如图像或 web 字体），并且可以把它们作为 _依赖_ 提供给你的应用程序。

webpack 从命令行或配置文件中定义的一个模块列表开始，处理你的应用程序。 从这些 入口起点 开始，webpack 递归地构建一个 依赖图 ，这个依赖图包含着应用程序所需的每个模块，然后将所有这些模块打包为少量的 bundle - 通常只有一个 - 可由浏览器加载。

```js
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const moduleAnalyser = filename => {
  const content = fs.readFileSync(filename, 'utf-8');
  const ast = parser.parse(content, {
    sourceType: 'module',
  });

  const dependences = {};

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      const dirname = path.dirname(filename);
      const newFile = `./${path.join(dirname, node.source.value)}`;
      dependences[node.source.value] = newFile;
    },
  });

  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env'],
  });
  return {
    dependences,
    filename,
    code,
  };
};

const makeDependenciesGraph = entry => {
  const entryModule = moduleAnalyser(entry);
  const graphArr = [entryModule];
  graphArr.forEach(({ dependences }) => {
    if (dependences) {
      for (let key in dependences) {
        graphArr.push(moduleAnalyser(dependences[key]));
      }
    }
  });
  console.log('graphArr: ', graphArr);
};

makeDependenciesGraph('./src/index.js');
```

查看依赖图谱

```shell
$ node bundler.js
graphArr:  [
  {
    dependences: { './a.js': './src/a.js' },
    filename: './src/index.js',
    code: '"use strict";\n' +
      '\n' +
      'var _a = _interopRequireDefault(require("./a.js"));\n' +
      '\n' +
      'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
      '\n' +
      'console.log("a: ", _a["default"]);'
  },
  {
    dependences: {},
    filename: './src/a.js',
    code: '"use strict";\n' +
      '\n' +
      'Object.defineProperty(exports, "__esModule", {\n' +
      '  value: true\n' +
      '});\n' +
      'exports["default"] = void 0;\n' +
      'var a = 1;\n' +
      'var _default = a;\n' +
      'exports["default"] = _default;'
  }
]
```

数据结构转换

```js
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const moduleAnalyser = filename => {
  const content = fs.readFileSync(filename, 'utf-8');
  const ast = parser.parse(content, {
    sourceType: 'module',
  });

  const dependences = {};

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      const dirname = path.dirname(filename);
      const newFile = `./${path.join(dirname, node.source.value)}`;
      dependences[node.source.value] = newFile;
    },
  });

  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env'],
  });
  return {
    dependences,
    filename,
    code,
  };
};

const makeDependenciesGraph = entry => {
  const entryModule = moduleAnalyser(entry);
  const graphArr = [entryModule];
  graphArr.forEach(({ dependences }) => {
    if (dependences) {
      for (let key in dependences) {
        graphArr.push(moduleAnalyser(dependences[key]));
      }
    }
  });

  const graph = graphArr.reduce((result, item) => {
    const { filename, code, dependences } = item;
    return { ...result, [filename]: { code, dependences } };
  }, {});

  console.log('graph: ', graph);
};

makeDependenciesGraph('./src/index.js');
```

```shell
$ node bundler.js
graph:  {
  './src/index.js': {
    code: '"use strict";\n' +
      '\n' +
      'var _a = _interopRequireDefault(require("./a.js"));\n' +
      '\n' +
      'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
      '\n' +
      'console.log("a: ", _a["default"]);',
    dependences: { './a.js': './src/a.js' }
  },
  './src/a.js': {
    code: '"use strict";\n' +
      '\n' +
      'Object.defineProperty(exports, "__esModule", {\n' +
      '  value: true\n' +
      '});\n' +
      'exports["default"] = void 0;\n' +
      'var a = 1;\n' +
      'var _default = a;\n' +
      'exports["default"] = _default;',
    dependences: {}
  }
}
```

代码生成

```js
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

const moduleAnalyser = filename => {
  const content = fs.readFileSync(filename, 'utf-8');
  const ast = parser.parse(content, {
    sourceType: 'module',
  });

  const dependences = {};

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      const dirname = path.dirname(filename);
      const newFile = `./${path.join(dirname, node.source.value)}`;
      dependences[node.source.value] = newFile;
    },
  });

  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env'],
  });
  return {
    dependences,
    filename,
    code,
  };
};

const makeDependenciesGraph = entry => {
  const entryModule = moduleAnalyser(entry);
  const graphArr = [entryModule];
  graphArr.forEach(({ dependences }) => {
    if (dependences) {
      for (let key in dependences) {
        graphArr.push(moduleAnalyser(dependences[key]));
      }
    }
  });

  const graph = graphArr.reduce((result, item) => {
    const { filename, code, dependences } = item;
    return { ...result, [filename]: { code, dependences } };
  }, {});

  return graph;
};

const generateCode = entry => {
  const graph = JSON.stringify(makeDependenciesGraph(entry));
  return `
        (function(graph){
            function require(module){
                function localRequire(relativePath){
                    return require(graph[module].dependences[relativePath])
                }
                var exports ={};
                (function(require, exports, code){
                    eval(code)
                })(localRequire, exports,graph[module].code)
                return exports
            }
            return require('${entry}')
        })(${graph})
    `;
};

const code = generateCode('./src/index.js');
console.log('code: ', code);
```
