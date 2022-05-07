import './style.css';
import cat from '../asset/cat.png';
import DataXml from './data.xml';
import DataCsv from './data.csv';
import DataYaml from './data.yaml';
import JSON5 from './data.json5';

console.log('JSON5: ', JSON5);
console.log('DataYaml: ', DataYaml);
console.log('DataCsv: ', DataCsv);
console.log('DataXml: ', DataXml);

function createImg() {
  const img = document.createElement('img');
  img.src = cat;
  img.width = 180;
  img.height = 180;
  document.body.appendChild(img);
}

(() => {
  createImg();
})();
