function component() {
  const btn = document.createElement('button');

  btn.innerText = 'Click Me';

  btn.onclick = function() {
    import(/* webpackChunkName: "print" */ './print').then(module => {
      const print = module.default;

      print;
    });
  };

  return btn;
}

document.body.appendChild(component());
