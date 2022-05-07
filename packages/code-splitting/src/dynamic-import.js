const getComponent = async () => {
  const { default: _ } = await import('lodash');

  const element = document.createElement('div');
  element.innerText = _.join(['dynamic', 'import'], ' ');

  return element;
};

(async () => {
  const component = await getComponent();
  document.body.appendChild(component);
})();
