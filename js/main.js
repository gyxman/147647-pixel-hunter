import {changeScreen} from './utils/util';
import introScreen from './screens/intro-screen';
import footer from './parts/footer';

changeScreen(introScreen);

const footerElement = document.querySelector(`#footer`);
footerElement.appendChild(footer);
