'use strict'; // без use strict webstorm ругается на первый const

const arrTemplates = [];
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

// массив порядка экранов
const orderScreens = [1, 2, 3];
const ARROW_RIGHT_CODE = 39;
const ARROW_LEFT_CODE = 37;
const arrowRight = document.querySelectorAll(`.arrows__btn`)[1];
const arrowLeft = document.querySelectorAll(`.arrows__btn`)[0];

let currentWindow = 0; // будем хранить текущий активный экран - пока взять не откуда его

const nextWindow = ()=> {
  currentWindow++;
  changeWindow(currentWindow);
};
const prevWindow = ()=> {
  currentWindow--;
  changeWindow(currentWindow);
};

for (let i = 0; i < templates.length; i++) {
  arrTemplates.push(templates[i]);
}

// функция смены окна
const changeWindow = (index) => {
  let number = orderScreens[index];
  mainContent.innerHTML = ``;
  mainContent.appendChild(arrTemplates[number].content);
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
arrowRight.addEventListener(`click`, function () {
  nextWindow();
});

arrowLeft.addEventListener(`click`, function () {
  prevWindow();
});

// TODO убрать
const footer = document.querySelector(`.footer`);
footer.setAttribute(`style`, `display:none;`);
