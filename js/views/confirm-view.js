import AbstractView from './abstract-view';

export default class ConfirmView extends AbstractView {
  get template() {
    return `
      <section class="modal">
        <form class="modal__inner">
          <button class="modal__close" type="button">
            <span class="visually-hidden">Закрыть</span>
          </button>
          <h2 class="modal__title">Подтверждение</h2>
          <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
          <div class="modal__button-wrapper">
            <button class="modal__btn">Ок</button>
            <button class="modal__btn">Отмена</button>
          </div>
        </form>
      </section>
    `;
  }

  bind() {
    const closeButton = this.element.querySelector(`.modal__close`);
    closeButton.addEventListener(`click`, () => {
      this.onClose();
    });

    const cancelButton = this.element.querySelector(`.modal__btn:last-child`);
    cancelButton.addEventListener(`click`, (event) => {
      event.preventDefault();
      this.onClose();
    });

    const okButton = this.element.querySelector(`.modal__btn:first-child`);
    okButton.addEventListener(`click`, (event) => {
      event.preventDefault();
      this.onResetGame();
    });
  }

  onResetGame() {}

  onClose() {}
}
