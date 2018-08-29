import {getElementFromTemplate} from '../utils/util';
import game1Data from '../data/game1-data';
import getHeader from '../parts/header';
import getFooter from '../parts/footer';

const template = (data) => `
  ${getHeader(data)}
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
  ${getFooter(data.creationDate)}
`;

const game1Element = getElementFromTemplate(template(game1Data));

export default game1Element;
