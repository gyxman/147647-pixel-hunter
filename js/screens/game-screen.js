import {changeScreen, getElementFromTemplate} from '../utils/util';
import levelsData from '../data/levels-data';
import getHeader from '../parts/header';
import goHome from '../utils/back-intro';
import statsScreen from './stats-screen';
import gameData from '../data/game-data';
import checkAnswer from '../utils/check-answer';
import updateInfo from '../utils/update-info';
import {updateStatistics} from './stats-screen';

const getGameTemplate = (data) => {
  if (data.type === `twoOfTwo` || data.type === `oneOfOne`) {
    return `
      <p class="game__task">${data.title}</p>
      <form class="game__content ${data.type === `oneOfOne` ? `game__content--wide` : ``}">
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
    `;
  }
  return `
    <p class="game__task">${data.title}</p>
    <form class="game__content ${data.type === `oneOfThree` ? `game__content--triple` : ``}">
      ${[...data.options].map((option, index) => `
        <div class="game__option"><img src="${option.src}" alt="Option ${index + 1}" width="304" height="455" data-answer="${option.labels[0].value}"></div>
      `).join(``)}
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
  `;
};

const template = (data, initialData) => `
  <header class="header">
    ${getHeader(initialData)}
  </header>
  <section class="game">
    
  </section>
`;


const gameElement = getElementFromTemplate(template(levelsData[gameData.level], gameData));

const backButton = gameElement.querySelector(`.back`);

goHome(backButton);

const gameContent = gameElement.querySelector(`.game`);

const changeLevel = (element) => {
  gameContent.innerHTML = ``;
  gameContent.innerHTML = element;

  if (levelsData[gameData.level].type === `twoOfTwo`) {
    const radioElements = gameElement.querySelectorAll(`.visually-hidden`);
    const variants = gameElement.querySelectorAll(`.game__option`);

    radioElements.forEach((radio) => {
      radio.addEventListener(`change`, ()=> {
        const selectedRadioElements = gameElement.querySelectorAll(`.visually-hidden:checked`);
        if (selectedRadioElements.length === variants.length) {
          saveResult([...selectedRadioElements].map((selectedRadio)=> selectedRadio.value));
          updateInfo();
          updateHeader(gameData);
          if (gameData.level < levelsData.length - 1) {
            gameData.level += 1;
            changeLevel(getGameTemplate(levelsData[gameData.level]));
          } else {
            changeScreen(statsScreen);
            updateStatistics(gameData);
          }
        }
      });
    });
  } else if (levelsData[gameData.level].type === `oneOfOne`) {
    const nextButtons = gameElement.querySelectorAll(`.game__answer`);
    nextButtons.forEach((button) => {
      button.addEventListener(`click`, (event)=> {
        event.preventDefault();
        const selectedElements = event.currentTarget.querySelectorAll(`.visually-hidden`);
        saveResult([...selectedElements].map((selectedRadio)=> selectedRadio.value));
        updateInfo();
        updateHeader(gameData);
        if (gameData.level < levelsData.length - 1) {
          gameData.level += 1;
          changeLevel(getGameTemplate(levelsData[gameData.level]));
        } else {
          changeScreen(statsScreen);
          updateStatistics(gameData);
        }
      });
    });
  } else {
    const nextButtons = gameElement.querySelectorAll(`.game__option`);
    nextButtons.forEach((button)=> {
      button.addEventListener(`click`, ()=> {
        const selectedElements = event.currentTarget.querySelectorAll(`img`);
        saveResult([...selectedElements].map((selectedRadio)=> selectedRadio.getAttribute(`data-answer`)));
        updateInfo();
        updateHeader(gameData);
        if (gameData.level < levelsData.length - 1) {
          gameData.level += 1;
          changeLevel(getGameTemplate(levelsData[gameData.level]));
        } else {
          changeScreen(statsScreen);
          updateStatistics(gameData);
        }
      });
    });
  }
};

const saveResult = (array) => {
  gameData.answers.push({answer: checkAnswer(array), time: `normal`});
};

const updateHeader = (initialData) => {
  const header = gameElement.querySelector(`.header`);
  header.innerHTML = ``;
  header.innerHTML = `${getHeader(initialData)}`;

  if (gameData.lives === 0) {
    changeScreen(statsScreen);
    updateStatistics(gameData);
  }
};

changeLevel(getGameTemplate(levelsData[gameData.level]));

export default gameElement;
