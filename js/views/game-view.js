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
          
        </ul>
    `;
  }

  setStats() {
    const stats = this.element.querySelector(`.stats`);
    const data = this.initialData;
    [...this.level].map((el, index) => {
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
    } else if (this.level[this.initialData.level].type === `oneOfOne`) {
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
