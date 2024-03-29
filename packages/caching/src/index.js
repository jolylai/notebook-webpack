import _ from 'lodash';
import math from './math';

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.onclick = math.add;

  return element;
}

document.body.appendChild(component());
