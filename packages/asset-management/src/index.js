import './style.css';
import cat from '../asset/cat.png';

(() => {
  const img = document.createElement('img');
  img.src = cat;
  img.width = 180;
  img.height = 180;
  document.body.appendChild(img);
})();
