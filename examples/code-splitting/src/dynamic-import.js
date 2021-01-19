function getComponent() {
  return import(/* webpackPrefetch: true */ 'lodash')
    .then(({ default: _ }) => {
      const element = document.createElement('div');

      element.innerText = _.concat(['Hello', 'Webpack']);

      return element;
    })
    .catch(error =>
      console.log('An error occurred while loading the component', error),
    );
}

getComponent().then(compoment => {
  document.body.appendChild(compoment);
});
