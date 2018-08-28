import {changeScreen, getElementFromTemplate} from '../utils/util';
import game2Screen from './game2-screen';
import goHome from '../utils/back-intro';
import getHeader from '../parts/header';
import getFooter from '../parts/footer';
import {INITIAL_GAME} from '../data/initial-data';

const template = `
<section class="game">
  <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
  <form class="game__content">
    <div class="game__option">
      <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
    <div class="game__option">
      <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question2" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question2" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
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

const game1Data = `${getHeader(INITIAL_GAME)} ${template} ${getFooter(2018)}`;
const game1Element = getElementFromTemplate(game1Data);

const radioElements = game1Element.querySelectorAll(`.visually-hidden`);
const variants = game1Element.querySelectorAll(`.game__option`);
const backButton = game1Element.querySelector(`.back`);

goHome(backButton);

radioElements.forEach((element)=> {
  element.addEventListener(`change`, ()=> {
    const selectedRadioElements = game1Element.querySelectorAll(`.visually-hidden:checked`);
    if (selectedRadioElements.length === variants.length) {
      changeScreen(game2Screen);
    }
  });
});

export default game1Element;
