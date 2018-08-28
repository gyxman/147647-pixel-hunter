import {changeScreen} from './utils/util';
import introScreen from './screens/intro-screen';
import introData from './data/intro-data';
import greetingScreen from './screens/greeting-screen';

changeScreen(introScreen(introData));

const nextButton = document.querySelector(`.intro__asterisk`);
nextButton.addEventListener(`click`, () => {
  changeScreen(greetingScreen);
});
