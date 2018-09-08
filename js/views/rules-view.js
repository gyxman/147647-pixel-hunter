import AbstractView from './abstract-view';

export default class RulesView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `
      <section class="rules">
        <h2 class="rules__title">${this.level.title}</h2>
        <ul class="rules__description">
          ${[...this.level.rules].map((rule) => `
                <li>${rule}</li>
            `).join(``)}
        </ul>
        <p class="rules__ready">${this.level.ready}</p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>${this.level.button}</button>
        </form>
      </section>
    `;
  }

  bind() {
    const form = this.element.querySelector(`.rules__form`);
    const submitButton = this.element.querySelector(`.rules__button`);
    const inputName = this.element.querySelector(`.rules__input`);

    inputName.addEventListener(`keyup`, ()=> {
      if (inputName.value.length > 0) {
        submitButton.removeAttribute(`disabled`);
      } else {
        submitButton.setAttribute(`disabled`, `disabled`);
      }
    });

    form.addEventListener(`submit`, (e)=> {
      e.preventDefault();
      const userName = inputName.value;
      this.onClick(userName);
    });
  }

  onClick(userName) {}
}
