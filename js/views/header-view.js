import AbstractView from './abstract-view';
import {INITIAL_GAME} from '../data/initial-data';

const headerMain = `
  <button class="back">
    <span class="visually-hidden">Вернуться к началу</span>
    <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
      <use xlink:href="img/sprite.svg#arrow-left"></use>
    </svg>
    <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
      <use xlink:href="img/sprite.svg#logo-small"></use>
    </svg>
  </button>
`;

const getHeaderEnhanced = (data, gameData) => `
  <div class="game__timer">${data.remainingTime}</div>
  <div class="game__lives">
  ${new Array(gameData.lives - data.lives)
  .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
    .join(``)}
  ${new Array(data.lives)
  .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
    .join(``)}
  </div>
`;

export default class HeaderView extends AbstractView {
  constructor(initialData) {
    super();
    this.initialData = initialData;
    this.gameData = INITIAL_GAME;
  }

  get template() {
    return `
      <header class="header">
        ${headerMain}
        ${this.initialData ? getHeaderEnhanced(this.initialData, this.gameData) : ``}
      </header>
    `;
  }

  blink(blink) {
    if (blink) {
      this.timer.classList.add(`game__timer--blink`);
    } else {
      this.timer.classList.remove(`game__timer--blink`);
    }
  }

  bind() {
    this.timer = this.element.querySelector(`.game__timer`);
    const backButton = this.element.querySelector(`.back`);

    backButton.addEventListener(`click`, () => {
      this.onBack();
    });
  }

  onBack() {}
}
