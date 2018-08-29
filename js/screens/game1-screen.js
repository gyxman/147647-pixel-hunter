import {changeScreen, getElementFromTemplate} from '../utils/util';
import game1Data from '../data/game1-data';
import game2Screen from './game2-screen';
import getHeader from '../parts/header';
import rulesScreen from './rules-screen';

const template = (data) => `
  <section class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      ${[...data.options].map((option) => `
        <div class="game__option">${option}</div>
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
  </section>
`;

const game1Element = getElementFromTemplate(template(game1Data));

const radioElements = game1Element.querySelectorAll(`.visually-hidden`);
const variants = game1Element.querySelectorAll(`.game__option`);

radioElements.forEach((element)=> {
  element.addEventListener(`change`, ()=> {
    const selectedRadioElements = game1Element.querySelectorAll(`.visually-hidden:checked`);
    if (selectedRadioElements.length === variants.length) {
      changeScreen(getHeader, game2Screen);
    }
  });
});

export default game1Element;
