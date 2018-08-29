import {changeScreen, getElementFromTemplate} from '../utils/util';
import game2Data from '../data/game2-data';
import game3Screen from './game3-screen';
import getHeader from '../parts/header';
import rulesScreen from './rules-screen';

const template = (data)=> `
  <section class="game">
    <p class="game__task">${data.title}</p>
    <form class="game__content  game__content--wide">
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

const game2Element = getElementFromTemplate(template(game2Data));

const nextButtons = game2Element.querySelectorAll(`.game__answer`);

nextButtons.forEach((element)=> {
  element.addEventListener(`click`, ()=> {
    changeScreen(getHeader, game3Screen);
  });
});

export default game2Element;
