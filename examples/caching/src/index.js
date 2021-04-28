import _ from 'lodash';

const greeting = _.join(['hello', 'webpack', 'Haha'], '!');

const el = document.createElement('div');
el.innerText = greeting;
document.body.appendChild(el);
