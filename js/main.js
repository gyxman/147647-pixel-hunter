'use strict';

const templates = document.querySelectorAll(`template`);
const mainContent = document.querySelector(`#main`);

const arrowsElement = document.createElement(`div`);
arrowsElement.classList.add(`arrows__wrap`);
arrowsElement.innerHTML = `
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
`;
document.body.appendChild(arrowsElement);

const screensOrders = [1, 2, 3, 4, 5]; // массив порядка экранов
const ARROW_RIGHT_CODE = 39;
const ARROW_LEFT_CODE = 37;
const arrowRight = arrowsElement.querySelectorAll(`.arrows__btn`)[1];
const arrowLeft = arrowsElement.querySelectorAll(`.arrows__btn`)[0];

let currentWindow = 0; // будем хранить текущий активный экран - пока взять негде его

const nextWindow = ()=> {
  if (currentWindow === screensOrders.length - 1) {
    return;
  }
  currentWindow += 1;
  changeWindow(currentWindow);
};
const prevWindow = ()=> {
  if (currentWindow === 0) {
    return;
  }
  currentWindow -= 1;
  changeWindow(currentWindow);
};

// for (let i = 0; i < templates.length; i++) {
//   templatesArray.push(templates[i]);
// }

const templatesArray = [].map.call(templates, (item) => item);

// функция смены окна
const changeWindow = (index) => {
  let number = screensOrders[index];
  let clone = templatesArray[number].content.cloneNode(true);
  mainContent.innerHTML = ``;
  mainContent.appendChild(clone);
};
changeWindow(currentWindow);

// обработка нажатий клавиатуры
document.onkeydown = function (event) {
  if (event.keyCode === ARROW_RIGHT_CODE) {
    nextWindow();
  } else if (event.keyCode === ARROW_LEFT_CODE) {
    prevWindow();
  }
};

// обработка кликов по стрелкам
arrowRight.addEventListener(`click`, ()=> {
  nextWindow();
});

arrowLeft.addEventListener(`click`, ()=> {
  prevWindow();
});
