import AbstractView from './abstract-view';
import checkAnswerType from '../utils/check-answer-type';
import HeaderView from './header-view';

const getRightAnswers = (data) => {
  const answers = data.map((item) => item !== `wrong` ? 1 : 0);
  return answers.reduce((sum, item) => sum + item);
};

const getFastAnswers = (data) => {
  const answers = data.map((item) => item === `fast` ? 1 : 0);
  return answers.reduce((sum, item) => sum + item);
};

const getSlowAnswers = (data) => {
  const answers = data.map((item) => item === `slow` ? 1 : 0);
  return answers.reduce((sum, item) => sum + item);
};

export default class StatsView extends AbstractView {
  constructor() {
    super();
    this.header = new HeaderView();
  }

  get template() {
    return `
      ${this.header.template}
      <section class="result">
        <div class="end">
          <div class="scoreboard">Scoreboard is loading...</div>
          <br>
          <div class="repeat"><span class="repeat-action">Сыграть заново</span></div>
        </div>
      </section>
    `;
  }

  get stepsTemplate() {
    return `
      <h2 class="result__title">${this.scores[this.last].lives ? `Победа!` : `Поражение!`}</h2>
      <table class="result__table">
        <tr>
        <td class="result__number">${this.userName}</td>
        <td colspan="2">
        <ul class="stats">
        ${(this.scores[this.last].answers).map((answer) => `
            <li class="stats__result ${checkAnswerType(answer)}"></li>
          `).join(``)}
            </ul>
          </td>
            <td class="result__points">× 100</td>
            <td class="result__total">
              ${this.getRightAnswers * 100}
            </td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${this.getFastAnswers} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${this.getFastAnswers * 50}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${this.scores[this.last].lives} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${this.scores[this.last].lives * 50}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${this.getSlowAnswers} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${this.getSlowAnswers * 50}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${this.getRightAnswers * 100 + this.scores[this.last].lives * 50 + this.getFastAnswers * 50 - this.getSlowAnswers * 50}</td>
        </tr>
      </table>
    `;
  }

  bind() {
    const backButton = this.element.querySelector(`.back`);

    backButton.addEventListener(`click`, () => {
      this.onBack();
    });

    this.element.querySelector(`span.repeat-action`).onclick = (evt) => {
      evt.preventDefault();
      this.onRepeat();
    };

    this._scoreBoardContainer = this.element.querySelector(`div.scoreboard`);
  }

  showScores(scores, userName) {
    this.userName = userName;
    this.scores = scores;
    this.last = this.scores.length - 1;
    this.scoresShort = this.scores.slice(0, this.scores.length - 1);
    this.getRightAnswers = getRightAnswers(scores[this.last].answers);
    this.getFastAnswers = getFastAnswers(scores[this.last].answers);
    this.getSlowAnswers = getSlowAnswers(scores[this.last].answers);

    this._scoreBoardContainer.innerHTML = `
      ${this.stepsTemplate}
      ${this.scoresShort.map((it, i) => `
        <table class="result__table">
          <tr>
            <td class="result__number">${i + 1}.</td>
            <td>
              <ul class="stats">
                ${(this.scores[i].answers).map((answer) => `
                  <li class="stats__result ${checkAnswerType(answer)}"></li>
                `).join(``)}
              </ul>
            </td>
            <td class="result__total">${getRightAnswers(scores[i].answers) * 100 + this.scores[i].lives * 50 + getFastAnswers(scores[i].answers) * 50 - getSlowAnswers(scores[i].answers) * 50}</td>
            <td class="result__total  result__total--final">${this.scores[i].lives ? `Победа!` : `Поражение!`}</td>
          </tr>
        </table>  
      `).join(``)}
    `;
  }

  onRepeat() {}

  onBack() {}
}
