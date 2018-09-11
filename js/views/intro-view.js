import AbstractView from './abstract-view';

export default class IntroView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `
    <section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto">${this.level.description}</p>
    </section>
  `;
  }

  bind() {
    const nextButton = this.element.querySelector(`.intro__asterisk`);
    nextButton.addEventListener(`click`, () => {
      this.onClick();
    });
  }

  onClick() {}
}
