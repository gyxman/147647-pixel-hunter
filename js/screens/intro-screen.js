import {changeScreen, getElementFromTemplate} from '../utils/util';
import greetingScreen from './greeting-screen';
import introData from '../data/intro-data';


const template = (data) => `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto">${data.description}</p>
  </section>
`;

const screen = getElementFromTemplate(template(introData));

const nextButton = screen.querySelector(`.intro__asterisk`);
nextButton.addEventListener(`click`, () => {
  changeScreen(greetingScreen);
});

export default screen;
