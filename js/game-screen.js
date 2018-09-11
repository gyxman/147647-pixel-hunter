import Application from './application';
import HeaderView from './views/header-view';
import LevelView from './views/level-view';
import levelsData from './data/levels-data';
import gameData from './data/game-data';
import {saveResult} from './utils/util';

const TIMER_INTERVAL = 1000;
const BLINK_TIME = 5;

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.header = new HeaderView(this.model.state);
    this.content = new LevelView(levelsData, gameData);
    this.content.setSizeImages();
    this.content.setStats();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);

    this._interval = null;

    this.header.onBack = () => this.onBack();
    this.content.onNext = (answers) => this.onAnswer(answers);
  }

  get element() {
    return this.root;
  }

  startGame() {
    this._interval = setInterval(() => {
      this.model.tick();
      if (!this.model.state.remainingTime) {

      } else {
        this.updateHeader();
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
  }

  changeLevel() {
    this.updateHeader();

    const level = new LevelView(levelsData, gameData);
    this.changeContentView(level);
    level.focus();
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }

  onAnswer(answers) {
    this.model.onAnswer(answers);
    saveResult(answers);

    this.resetTimer();
    this.updateHeader();
    //this.updateGame();

    if (gameData.lives === 0) {
      Application.showStats();
      return;
    }

    console.log(this.model.state)

    if (gameData.level < levelsData.length - 1) {
      //gameData.level += 1;
      Application.showGame();
    } else {
      Application.showStats();
    }
  }

  bind() {}

  onBack() {}
}
