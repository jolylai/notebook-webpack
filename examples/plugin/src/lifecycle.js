import { SyncHook, AsyncParallelHook, SyncBailHook } from 'tapable';

// // 创建一个同步 Hook，指定参数
// const hooks = new SyncHook(['arg1', 'arg2']);

// // 注册
// hooks.tap('step', (...args) => {
//   console.log('args: ', args);
// });

// // 调用
// hooks.call(1, 2);

const bailHook = new SyncBailHook();

bailHook.tap('step1', () => {
  console.log('step1');
  return true;
});

bailHook.tap('step2', () => {
  console.log('step2');
});

bailHook.call();
