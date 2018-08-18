import introScreen from './intro-screen';
import {changeScreen} from './until';

export default (button)=> {
  button.addEventListener(`click`, ()=> {
    changeScreen(introScreen);
  });
};
