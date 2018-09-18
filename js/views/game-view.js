import AbstractView from './abstract-view';
import {getFrame, setImagesSize} from '../utils/util';
import HeaderView from './header-view';

export default class GameView extends AbstractView {
  constructor(level, initialData) {
    super();
    this.levels = level;
    this.initialData = initialData;
    this.header = new HeaderView(this.initialData);
  }

  get template() {
    return `
      <header class="header">
        ${this.header.template}
      </header>
      <section class="game">
        ${this.partTemplate}
      </section>
    `;
  }

  get partTemplate() {
    if (this.levels[this.initialData.level].type === `twoOfTwo` || this.levels[this.initialData.level].type === `oneOfOne`) {
      return `
        <p class="game__task">${this.levels[this.initialData.level].title}</p>
        <form class="game__content ${this.levels[this.initialData.level].type === `oneOfOne` ? `game__content--wide` : ``}">
          ${[...this.levels[this.initialData.level].options].map((option, index) => `
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
          
        </ul>
      `;
    }
    return `
      <p class="game__task">${this.levels[this.initialData.level].title}</p>
      <form class="game__content ${this.levels[this.initialData.level].type === `oneOfThree` ? `game__content--triple` : ``}">
        ${[...this.levels[this.initialData.level].options].map((option, index) => `
          <div class="game__option"><img src="${option.src}" alt="Option ${index + 1}" data-answer="${option.labels[0].value}"></div>
        `).join(``)}
      </form>
        <ul class="stats">
          
        </ul>
    `;
  }

  setStats() {
    const stats = this.element.querySelector(`.stats`);
    const data = this.initialData;
    [...this.levels].map((el, index) => {
      const element = document.createElement(`li`);
      if (data.answers[index]) {
        if (data.answers[index].time === `normal` && data.answers[index].answer) {
          element.classList.add(`stats__result`, `stats__result--correct`);
        } else if (data.answers[index].time === `normal` && !data.answers[index].answer) {
          element.classList.add(`stats__result`, `stats__result--wrong`);
        }
      } else {
        element.classList.add(`stats__result`, `stats__result--unknown`);
      }
      stats.appendChild(element);
    });
  }

  setSizeImages() {
    const variants = this.element.querySelectorAll(`.game__option`);
    const frame = getFrame(variants[0]);
    setImagesSize(frame, this.element.querySelectorAll(`.game img`), this.levels[this.initialData.level]);
  }

  bind() {
    const variants = this.element.querySelectorAll(`.game__option`);

    if (this.levels[this.initialData.level].type === `twoOfTwo`) {
      const radioElements = this.element.querySelectorAll(`.game__content .visually-hidden`);
      radioElements.forEach((radio) => {
        radio.addEventListener(`change`, ()=> {
          const selectedRadioElements = this.element.querySelectorAll(`.visually-hidden:checked`);
          if (selectedRadioElements.length === variants.length) {
            this.onNext([...selectedRadioElements].map((selectedRadio)=> selectedRadio.value));
          }
        });
      });
    } else if (this.levels[this.initialData.level].type === `oneOfOne`) {
      const nextButtons = this.element.querySelectorAll(`.game__answer`);
      nextButtons.forEach((button) => {
        button.addEventListener(`click`, (event)=> {
          event.preventDefault();
          const selectedElements = event.currentTarget.querySelectorAll(`.visually-hidden`);
          this.onNext([...selectedElements].map((selectedRadio)=> selectedRadio.value));
        });
      });
    } else {
      const nextButtons = this.element.querySelectorAll(`.game__option`);
      nextButtons.forEach((button)=> {
        button.addEventListener(`click`, ()=> {
          const selectedElements = event.currentTarget.querySelectorAll(`img`);
          this.onNext([...selectedElements].map((selectedRadio)=> selectedRadio.getAttribute(`data-answer`)));
        });
      });
    }

    const backButton = this.element.querySelector(`.back`);
    backButton.addEventListener(`click`, () => {
      this.onBack();
    });
  }

  onClick() {}

  onBack() {}
}
