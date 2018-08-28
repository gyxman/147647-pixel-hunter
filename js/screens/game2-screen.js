import {changeScreen, getElementFromTemplate} from '../utils/util';
import game3Screen from './game3-screen';
import goHome from '../utils/back-intro';
import header from '../parts/header';
import {INITIAL_GAME} from '../data/initial-data';

const template = `
<section class="game">
  <p class="game__task">Угадай, фото или рисунок?</p>
  <form class="game__content  game__content--wide">
    <div class="game__option">
      <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>
  <ul class="stats">
    <li class="stats__result stats__result--wrong"></li>
    <li class="stats__result stats__result--slow"></li>
    <li class="stats__result stats__result--fast"></li>
    <li class="stats__result stats__result--correct"></li>
    <li class="stats__result stats__result--wrong"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--slow"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--fast"></li>
    <li class="stats__result stats__result--unknown"></li>
  </ul>
</section>
`;

const headerElement = header(INITIAL_GAME);
const game2Data = `${headerElement} ${template}`;
const game2Element = getElementFromTemplate(game2Data);

const nextButtons = game2Element.querySelectorAll(`.game__answer`);
const backButton = game2Element.querySelector(`.back`);

goHome(backButton);

nextButtons.forEach((element)=> {
  element.addEventListener(`click`, ()=> {
    changeScreen(game3Screen);
  });
});

export default game2Element;
