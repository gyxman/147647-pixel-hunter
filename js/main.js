import Application from './application';
import footer from './parts/footer';

Application.start();

const footerElement = document.querySelector(`#footer`);
footerElement.appendChild(footer);

// добавлен debug режим - в адресной строке нужно добавить флаг #debug
