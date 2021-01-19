---
title: 懒加载
---

## 前言

**懒加载**(lazy loading)是一种将资源标识为非阻塞(非关键)并仅在需要时加载这些资源的策略。它可以缩短关键呈现路径的长度，从而减少页面加载时间。

`src/print.js`

```js
console.log(
  'The print.js module has loaded! See the network tab in dev tools...',
);

export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
};
```

`index.js`

```js
import _ from 'lodash';

function component() {
  const element = document.createElement('div');
  const button = document.createElement('button');
  const br = document.createElement('br');

  button.innerHTML = 'Click me and look at the console!';
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.appendChild(br);
  element.appendChild(button);

  // Note that because a network request is involved, some indication
  button.onclick = e =>
    import(/* webpackChunkName: "print" */ './print').then(module => {
      const print = module.default;

      print();
    });

  return element;
}

document.body.appendChild(component());
```

现在让我们运行 webpack 并检查我们新的延迟加载功能

```shell
     Asset       Size  Chunks             Chunk Names
index.html  330 bytes          [emitted]
   main.js    657 KiB    main  [emitted]  main
  print.js  639 bytes   print  [emitted]  print
```

使用浏览器打开`index.html`首次不会加载`print.js`文件，只有在按钮在点击之后才会被加载

`index.js`中核心代码

```js
button.onclick = e =>
  import(/* webpackChunkName: "print" */ './print').then(module => {
    const print = module.default;

    print();
  });
```

删除`/* webpackChunkName: "print" */`从新执行打包

```shell
     Asset       Size  Chunks             Chunk Names
      0.js  633 bytes       0  [emitted]
index.html  330 bytes          [emitted]
   main.js    656 KiB    main  [emitted]  main
```

打包后的`print.js` 变成了`0.js`，

<Alert>
注意，在ES6模块上使用import()时，必须引用.default属性，因为它是解析承诺时将返回的实际模块对象。
</Alert>

```js
button.onclick = async e => {
  const { default: print } = await import(
    /* webpackChunkName: "print" */ './print'
  );
  print();
};
```
