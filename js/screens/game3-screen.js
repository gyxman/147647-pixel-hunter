import {changeScreen, getElementFromTemplate} from '../utils/util';
import statsScreen from './stats-screen';
import goHome from '../utils/back-intro';
import header from '../parts/header';
import {INITIAL_GAME} from '../data/initial-data';

const template = `
<section class="game">
  <p class="game__task">Найдите рисунок среди изображений</p>
  <form class="game__content  game__content--triple">
    <div class="game__option">
      <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
    </div>
    <div class="game__option  game__option--selected">
      <img src="http://placehold.it/304x455" alt="Option 2" width="304" height="455">
    </div>
    <div class="game__option">
      <img src="http://placehold.it/304x455" alt="Option 3" width="304" height="455">
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
const game3Data = `${headerElement} ${template}`;
const game3Element = getElementFromTemplate(game3Data);

const nextButtons = game3Element.querySelectorAll(`.game__option`);
const backButton = game3Element.querySelector(`.back`);

goHome(backButton);

nextButtons.forEach((element)=> {
  element.addEventListener(`click`, ()=> {
    changeScreen(statsScreen);
  });
});

export default game3Element;
