import {changeScreen, getElementFromTemplate} from '../utils/util';
import gameData from '../data/game-data';
import getHeader from '../parts/header';
import goHome from '../utils/back-intro';

const initialState = {
  level: `level-0`,
  lives: 3,
  remainingTime: 0,
};

const getGameTemplate = (data, initialData) => {
  if (initialData.level === `level-0` || initialData.level === `level-1`) {
    return `
      ${[...data.options].map((option, index) => `
        <div class="game__option">
          <img src="${option.src}" alt="Option ${index + 1}" width="468" height="458">
          <label class="game__answer game__answer--photo">
            <input class="visually-hidden" name="question${index + 1}" type="radio" value="${option.labels[0].value}">
            <span>${option.labels[0].name}</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input class="visually-hidden" name="question${index + 1}" type="radio" value="${option.labels[1].value}">
            <span>${option.labels[0].name}</span>
          </label>
        </div>
      `).join(``)}
    `;
  }
  return `
    ${[...data.options].map((option, index) => `
      <div class="game__option"><img src="${option.src}" alt="Option ${index + 1}" width="304" height="455"></div>
    `).join(``)}
  `;
};

const template = (data, initialData) => `
  ${getHeader(initialData)}
  <section class="game">
    <p class="game__task">${data.title}</p>
    <form class="game__content ${initialData.level === `level-1` ? `game__content--wide` : ``}">
      /*${[...data.options].map((option, index) => `
      <div class="game__option">
        <img src="${option.src}" alt="Option ${index + 1}" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question${index + 1}" type="radio" value="${option.labels[0].value}">
          <span>${option.labels[0].name}</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question${index + 1}" type="radio" value="${option.labels[1].value}">
          <span>${option.labels[0].name}</span>
        </label>
      </div>
      `).join(``)}*/
      ${getGameTemplate(data, initialData)}
    </form>
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </section>
`;

const gameElement = getElementFromTemplate(template(gameData[initialState.level], initialState));

const radioElements = gameElement.querySelectorAll(`.visually-hidden`);
const variants = gameElement.querySelectorAll(`.game__option`);
const backButton = gameElement.querySelector(`.back`);

goHome(backButton);

radioElements.forEach((element)=> {
  element.addEventListener(`change`, ()=> {
    const selectedRadioElements = gameElement.querySelectorAll(`.visually-hidden:checked`);
    if (selectedRadioElements.length === variants.length) {
      initialState.level = `level-1`;
      changeScreen(getElementFromTemplate(template(gameData[initialState.level], initialState)));
    }
  });
});

export default gameElement;
