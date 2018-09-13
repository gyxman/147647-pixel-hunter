import AbstractView from './abstract-view';
import {getFrame, setImagesSize} from '../utils/util';
import checkAnswerType from '../utils/check-answer-type';

export default class LevelView extends AbstractView {
  constructor(level, initialData) {
    super();
    this.level = level;
    this.initialData = initialData;
  }

  get template() {
    return `
      <section class="game">
        ${this.partTemplate}
      </section>
    `;
  }

  get partTemplate() {
    if (this.level[this.initialData.level].type === `two-of-two` || this.level[this.initialData.level].type === `tinder-like`) {
      return `
        <p class="game__task">${this.level[this.initialData.level].question}</p>
        <form class="game__content ${this.level[this.initialData.level].type === `tinder-like` ? `game__content--wide` : ``}">
          ${[...this.level[this.initialData.level].answers].map((option, index) => `
            <div class="game__option">
              <img src="${option.src}" alt="Option ${index + 1}">
              <label class="game__answer game__answer--photo">
                <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer game__answer--paint">
                <input class="visually-hidden" name="question${index + 1}" type="radio" value="painting">
                <span>Рисунок</span>
              </label>
            </div>
          `).join(``)}
        </form>
        <ul class="stats">
          
        </ul>
      `;
    }
    return `
      <p class="game__task">${this.level[this.initialData.level].question}</p>
      <form class="game__content ${this.level[this.initialData.level].type === `one-of-three` ? `game__content--triple` : ``}">
        ${[...this.level[this.initialData.level].answers].map((option, index) => `
          <div class="game__option"><img src="${option.src}" alt="Option ${index + 1}" data-answer="${option.answer}"></div>
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
      const additionalClass = checkAnswerType(data.answers[index]);
      element.classList.add(`stats__result`, additionalClass);
      stats.appendChild(element);
    });
  }

  setSizeImages() {
    setTimeout(() => {
      const variants = this.element.querySelectorAll(`.game__option`);
      const frame = getFrame(variants[0]);
      setImagesSize(frame, this.element.querySelectorAll(`.game img`), this.level[this.initialData.level]);
    }, 0);
  }

  bind() {
    const variants = this.element.querySelectorAll(`.game__option`);

    if (this.level[this.initialData.level].type === `two-of-two`) {
      const radioElements = this.element.querySelectorAll(`.game__content .visually-hidden`);
      radioElements.forEach((radio) => {
        radio.addEventListener(`change`, ()=> {
          const selectedRadioElements = this.element.querySelectorAll(`.visually-hidden:checked`);
          if (selectedRadioElements.length === variants.length) {
            this.onNext([...selectedRadioElements].map((selectedRadio)=> selectedRadio.value));
          }
        });
      });
    } else if (this.level[this.initialData.level].type === `tinder-like`) {
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
  }

  onClick() {}
}
