import './index.css';

function createButton() {
  const btn = document.createElement('button');
  btn.innerText = 'Button';

  document.body.appendChild(btn);
}

export default createButton;
