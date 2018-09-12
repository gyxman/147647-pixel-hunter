import getHeader from '../parts/header';
import AbstractView from './abstract-view';
import checkAnswerType from '../utils/check-answer-type';

const rightAnswers = (data) => {
  const array = [...data].map((item) => item.answer ? 1 : 0);
  return array.reduce((sum, item) => sum + item);
};

const fastAnswers = (data) => {
  const array = [...data].filter((item) => item.answer);
  const arrFast = array.map((item) => item.time === `fast` ? 1 : 0);
  return arrFast.reduce((sum, item) => sum + item);
};

const slowAnswers = (data) => {
  const array = [...data].filter((item) => item.answer);
  const arrSlow = array.map((item) => item.time === `slow` ? 1 : 0);
  return arrSlow.reduce((sum, item) => sum + item);
};

export default class StatsView extends AbstractView {
  constructor(initialData) {
    super();
    this.initialData = initialData;
    this.rightAnswers = rightAnswers(initialData.answers);
    this.fastAnswers = fastAnswers(initialData.answers);
    this.slowAnswers = slowAnswers(initialData.answers);
  }

  get template() {
    return `
      <header class="header">
        ${getHeader()}
      </header>
      <section class="result">
        ${this.stepsTemplate}
        <table class="result__table" style="display:none;">
          <tr>
            <td class="result__number">2.</td>
            <td>
              <ul class="stats">
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--correct"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--wrong"></li>
              </ul>
            </td>
            <td class="result__total"></td>
            <td class="result__total  result__total--final">fail</td>
          </tr>
        </table>
        <table class="result__table" style="display:none;">
          <tr>
            <td class="result__number">3.</td>
            <td colspan="2">
              <ul class="stats">
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--correct"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--unknown"></li>
              </ul>
            </td>
            <td class="result__points">× 100</td>
            <td class="result__total">900</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">× 50</td>
            <td class="result__total">100</td>
          </tr>
          <tr>
            <td colspan="5" class="result__total  result__total--final">950</td>
          </tr>
        </table>
      </section>
    `;
  }

  get stepsTemplate() {
    return `
      <h2 class="result__title">${this.initialData.lives ? `Победа!` : `Поражение!`}</h2>
      <table class="result__table">
        <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
        <ul class="stats">
        ${(this.initialData.answers).map((answer) => `
            <li class="stats__result ${checkAnswerType(answer)}"></li>
          `).join(``)}
            </ul>
          </td>
            <td class="result__points">× 100</td>
            <td class="result__total">
              ${this.rightAnswers * 100}
            </td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${this.fastAnswers} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${this.fastAnswers * 50}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${this.initialData.lives} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${this.initialData.lives * 50}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${this.slowAnswers} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${this.slowAnswers * 50}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${this.rightAnswers * 100 + this.initialData.lives * 50 + this.fastAnswers * 50 - this.slowAnswers * 50}</td>
        </tr>
      </table>
    `;
  }

  bind() {
    const backButton = this.element.querySelector(`.back`);

    backButton.addEventListener(`click`, () => {
      this.onBack();
    });
  }

  onBack() {}
}
