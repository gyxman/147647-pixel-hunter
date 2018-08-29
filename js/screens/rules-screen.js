import {changeScreen, getElementFromTemplate} from '../utils/util';
import rulesData from '../data/rules-data';
import getHeader from '../parts/header';
import game1Screen from './game1-screen';

const template = (data) => `
  <section class="rules">
    <h2 class="rules__title">${data.title}</h2>
    <ul class="rules__description">
      ${[...data.rules].map((rule) => `
            <li>${rule}</li>
      `).join(``)}
    </ul>
    <p class="rules__ready">${data.ready}</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>${data.button}</button>
    </form>
  </section>
`;

const rulesElement = getElementFromTemplate(template(rulesData));

const form = rulesElement.querySelector(`.rules__form`);
const submitButton = rulesElement.querySelector(`.rules__button`);
const inputName = rulesElement.querySelector(`.rules__input`);

inputName.addEventListener(`keyup`, ()=> {
  if (inputName.value.length > 0) {
    submitButton.removeAttribute(`disabled`);
  } else {
    submitButton.setAttribute(`disabled`, `disabled`);
  }
});

form.addEventListener(`submit`, (e)=> {
  e.preventDefault();
  changeScreen(getHeader, game1Screen);
});

export default rulesElement;
