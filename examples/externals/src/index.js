import { add } from './math';

const result = add([1, 2]);

const div = document.createElement('div');

div.innerText = result;

document.body.appendChild(div);
