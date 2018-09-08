import {getElementFromTemplate} from '../utils/util';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Нельзя вызывать абстрактный класс напрямую`);
    }
  }

  get template() {

  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind(element) {
    throw new Error(`Метод bind должен быть переопределен`);
  }
}
