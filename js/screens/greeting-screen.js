import {getElementFromTemplate} from '../utils/util';
import getFooter from '../parts/footer';

export default (data) => {
  const template = `
    <img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
    <div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
    <div class="greeting__challenge">
      <h3 class="greeting__challenge-title">${data.title}</h3>
      <p class="greeting__challenge-text">${data.rulesTitle}</p>
      <ul class="greeting__challenge-list">
        ${[...data.rules].map((rule) => `
          <li class="answer">${rule}</li>
        `).join(``)}
      </ul>
    </div>
    <button class="greeting__continue" type="button">
      <span class="visually-hidden">Продолжить</span>
      <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-right"></use>
      </svg>
    </button>
  `;

  const page = `
    <section class="greeting central--blur">
      ${template}
    </section>
    ${getFooter(data.creationDate)}
  `;

  return getElementFromTemplate(page);
};
