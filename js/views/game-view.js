import getHeader from '../parts/header';
import AbstractView from './abstract-view';

export default class GameView extends AbstractView {
  constructor(level, initialData) {
    super();
    this.level = level;
    this.initialData = initialData;
  }

  get template() {
    return `
      <header class="header">
        ${getHeader(this.initialData)}
      </header>
      <section class="game">
        ${this.partTemplate}
      </section>
    `;
  }

  get partTemplate() {
    if (this.level[this.initialData.level].type === `twoOfTwo` || this.level[this.initialData.level].type === `oneOfOne`) {
      return `
        <p class="game__task">${this.level[this.initialData.level].title}</p>
        <form class="game__content ${this.level[this.initialData.level].type === `oneOfOne` ? `game__content--wide` : ``}">
          ${[...this.level[this.initialData.level].options].map((option, index) => `
            <div class="game__option">
              <img src="${option.src}" alt="Option ${index + 1}">
              <label class="game__answer game__answer--photo">
                <input class="visually-hidden" name="question${index + 1}" type="radio" value="${option.labels[0].value}">
                <span>${option.labels[0].name}</span>
              </label>
              <label class="game__answer game__answer--paint">
                <input class="visually-hidden" name="question${index + 1}" type="radio" value="${option.labels[1].value}">
                <span>${option.labels[0].name}</span>
              </label>
            </div>
          `).join(``)}
        </form>
        <ul class="stats">
          <li class="stats__result stats__result--wrong"></li>
          <li class="stats__result stats__result--slow"></li>
          <li class="stats__result stats__result--fast"></li>
          <li class="stats__result stats__result--correct"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--unknown"></li>
        </ul>
      `;
    }
    return `
      <p class="game__task">${this.level[this.initialData.level].title}</p>
      <form class="game__content ${this.level[this.initialData.level].type === `oneOfThree` ? `game__content--triple` : ``}">
        ${[...this.level[this.initialData.level].options].map((option, index) => `
          <div class="game__option"><img src="${option.src}" alt="Option ${index + 1}" data-answer="${option.labels[0].value}"></div>
        `).join(``)}
      </form>
        <ul class="stats">
          <li class="stats__result stats__result--wrong"></li>
          <li class="stats__result stats__result--slow"></li>
          <li class="stats__result stats__result--fast"></li>
          <li class="stats__result stats__result--correct"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--unknown"></li>
        </ul>
    `;
  }

  bind() {
    const variants = this.element.querySelectorAll(`.game__option`);

    if (this.level[this.initialData.level].type === `twoOfTwo`) {
      const radioElements = this.element.querySelectorAll(`.game__content .visually-hidden`);
      radioElements.forEach((radio) => {
        radio.addEventListener(`change`, ()=> {
          const selectedRadioElements = this.element.querySelectorAll(`.visually-hidden:checked`);
          if (selectedRadioElements.length === variants.length) {
            this.onNext([...selectedRadioElements].map((selectedRadio)=> selectedRadio.value));
          }
        });
      });
    }

    const backButton = this.element.querySelector(`.back`);
    backButton.addEventListener(`click`, () => {
      console.log(this.element.querySelectorAll(`.visually-hidden:checked`).length)
      //this.onBack();
    });
  }

  onClick() {}
  onBack() {}
}
