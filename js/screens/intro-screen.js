import {getElementFromTemplate} from '../utils/util';
import getFooter from '../parts/footer';

export default (data) => {
  const template = `
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto">${data.description}</p>
  `;

  const page = `
    <section class="intro">
      ${template}
    </section>
    ${getFooter(data.creationDate)}
  `;

  return getElementFromTemplate(page);
};
