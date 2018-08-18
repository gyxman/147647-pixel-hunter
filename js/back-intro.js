import introScreen from './intro-screen';
import {changeScreen} from './util';

export default (button)=> {
  button.addEventListener(`click`, ()=> {
    changeScreen(introScreen);
  });
};
