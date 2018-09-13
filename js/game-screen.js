import Application from './application';
import HeaderView from './views/header-view';
import LevelView from './views/level-view';

const TIMER_INTERVAL = 1000;
const BLINK_TIME = 5;

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.header = new HeaderView(this.model.state);
    this.content = new LevelView(this.model.levelsData, this.model.state);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);

    this.timerElement = this.header.element.querySelector(`.game__timer`);

    this._interval = null;
  }

  get element() {
    return this.root;
  }

  startGame() {
    this.content.setSizeImages();
    this.content.setStats();
    this.header.onBack = () => this.onBack();
    this.content.onNext = (answers, time) => this.onAnswer(answers, time);

    this._interval = setInterval(() => {
      this.model.tick();
      this.updateHeader();
      if (!this.model.state.remainingTime) {
        this.onAnswer();
      }
      if (this.model.state.remainingTime <= BLINK_TIME) {
        this.header.blink(true);
      }
    }, TIMER_INTERVAL);
  }

  resetTimer() {
    clearInterval(this._interval);
    this.header.blink(false);
    this.model.resetTimer();
  }

  exit() {
    Application.showStats(this.model);
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
    this.header.onBack = () => this.onBack();
    this.timerElement = this.header.element.querySelector(`.game__timer`);
  }

  changeLevel() {
    this.updateHeader();

    const level = new LevelView(this.model.levelsData, this.model.state);
    this.changeContentView(level);
    this.startGame();
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }

  onAnswer(answers = false) {
    const time = this.timerElement.innerHTML;
    this.model.onAnswer(answers, time);

    this.resetTimer();
    this.updateHeader();

    if (this.model.state.lives === 0) {
      this.onEndGame(this.model.state);
      return;
    }

    if (this.model.state.level < this.model.levelsData.length) {
      this.changeLevel();
    } else {
      this.onEndGame(this.model.state);
    }
  }

  bind() {}

  onBack() {}

  onEndGame() {}
}
