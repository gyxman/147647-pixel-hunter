import AbstractView from './abstract-view';
import checkAnswerType from '../utils/check-answer-type';
import HeaderView from './header-view';
import {INITIAL_GAME} from '../data/initial-data';

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
        <td class="result__number result__number--name"></td>
        <td colspan="2">
        <ul class="stats">
        ${(this.scores[this.last].answers).map((answer) => `
            <li class="stats__result ${checkAnswerType(answer)}"></li>
          `).join(``)}
            </ul>
          </td>
            <td class="result__points">× ${INITIAL_GAME.currentAnswerPoints}</td>
            <td class="result__total">
              ${this.scores[this.last].countRightPoints}
            </td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${this.scores[this.last].countFastAnswers} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× ${INITIAL_GAME.fastAnswerPoints}</td>
          <td class="result__total">${this.scores[this.last].countFastPoints}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${this.scores[this.last].lives} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× ${INITIAL_GAME.lifePoints}</td>
          <td class="result__total">${this.scores[this.last].countLivesPoints}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${this.scores[this.last].countSlowAnswers} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× ${INITIAL_GAME.slowAnswerPoints}</td>
          <td class="result__total">${this.scores[this.last].countSlowPoints}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${this.scores[this.last].countTotalPoints}</td>
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
            <td class="result__total">${this.scores[i].countTotalPoints}</td>
            <td class="result__total  result__total--final">${this.scores[i].lives ? `Победа!` : `Поражение!`}</td>
          </tr>
        </table>  
      `).join(``)}
    `;

    this._scoreBoardContainer.querySelector(`.result__number--name`).textContent = this.userName;
  }

  onRepeat() {}

  onBack() {}
}
