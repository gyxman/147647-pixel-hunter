import AbstractView from './abstract-view';

export default class GreetingView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `
      <section class="greeting central--blur">
          <img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
          <div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
        <div class="greeting__challenge">
          <h3 class="greeting__challenge-title">${this.level.title}</h3>
          <p class="greeting__challenge-text">${this.level.rulesTitle}</p>
          <ul class="greeting__challenge-list">
          ${[...this.level.rules].map((rule) => `
            <li>${rule}</li>
            `).join(``)}
          </ul>
        </div>
        <button class="greeting__continue" type="button">
          <span class="visually-hidden">Продолжить</span>
          <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
            <use xlink:href="img/sprite.svg#arrow-right"></use>
          </svg>
        </button>
      </section>
    `;
  }

  bind() {
    const nextButton = this.element.querySelector(`.greeting__continue`);
    nextButton.addEventListener(`click`, () => {
      this.onClick();
    });
  }

  onClick() {}
}
