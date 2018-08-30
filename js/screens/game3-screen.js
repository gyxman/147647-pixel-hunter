import {changeScreen, getElementFromTemplate} from '../utils/util';
import game3Data from '../data/game3-data';
import getHeader from '../parts/header';
import statsScreen from './stats-screen';
import goHome from '../utils/back-intro';

const template = (data) => `
  ${getHeader(data)}
  <section class="game">
    <p class="game__task">${data.title}</p>
    <form class="game__content  game__content--triple">
      ${[...data.options].map((option) => `
        <div class="game__option">${option}</div>
      `).join(``)}
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

const game3Element = getElementFromTemplate(template(game3Data));
const nextButtons = game3Element.querySelectorAll(`.game__option`);
const backButton = game3Element.querySelector(`.back`);

goHome(backButton);

nextButtons.forEach((element)=> {
  element.addEventListener(`click`, ()=> {
    changeScreen(statsScreen);
  });
});

export default game3Element;
