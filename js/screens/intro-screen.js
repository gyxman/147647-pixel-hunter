import {changeScreen, getElementFromTemplate} from '../utils/util';
import greetingScreen from './greeting-screen';

const template = `
<section class="intro">
  <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</section>
`;

const introElement = getElementFromTemplate(template);

const nextButton = introElement.querySelector(`.intro__asterisk`);

nextButton.addEventListener(`click`, () => {
  changeScreen(greetingScreen);
});

export default introElement;
