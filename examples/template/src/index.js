import _ from 'lodash';

const greeting = _.join(['hello', 'webpack'], '!');

const el = document.createElement('div');
el.innerText = greeting;
document.body.appendChild(el);
