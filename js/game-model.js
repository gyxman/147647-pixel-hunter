import {INITIAL_GAME} from './data/initial-data';
import {saveResult, tick} from './utils/util';
import checkAnswer from './utils/check-answer';
import {countLives} from './utils/count-lives';
import {changeLevel} from './utils/change-level';

export default class GameModel {
  constructor(data, userName) {
    this.levelsData = data;
    this.userName = userName;
    this.restart();
  }

  get state() {
    return Object.freeze(this._state);
  }

  restart() {
    this._state = INITIAL_GAME;
  }

  tick() {
    this._state = tick(this._state);
  }

  resetTimer() {
    this._state = Object.assign({}, this._state, {remainingTime: INITIAL_GAME.remainingTime});
  }

  onAnswer(answers, time) {
    this._state = saveResult(this.levelsData, this._state, answers, time);
    this._state = countLives(this._state, checkAnswer(this.levelsData, this._state, answers) ? this._state.lives : this._state.lives - 1);
    this._state = changeLevel(this._state, this._state.level + 1);
  }
}
