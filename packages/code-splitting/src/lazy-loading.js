function createBtn() {
  const btn = document.createElement('button');
  btn.innerText = '点击加载文件';

  btn.addEventListener('click', async () => {
    const { default: _ } = await import(
      /* webpackChunkName: 'lodash',webpackPrefetch: true */ 'lodash'
    );
    btn.innerHTML = _.join(['lodash', '加载成功'], ' ');
  });

  return btn;
}

document.body.appendChild(createBtn());
