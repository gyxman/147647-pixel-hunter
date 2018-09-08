import Application from './app';
import footer from './parts/footer';

Application.showIntro();

const footerElement = document.querySelector(`#footer`);
footerElement.appendChild(footer);
