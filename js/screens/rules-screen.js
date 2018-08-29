import {getElementFromTemplate} from '../utils/util';
import rulesData from '../data/rules-data';
import getHeader from '../parts/header';
import getFooter from '../parts/footer';

const template = (data) => `
  ${getHeader(data)}
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
  ${getFooter(data.creationDate)}
`;

const rulesElement = getElementFromTemplate(template(rulesData));

export default rulesElement;
