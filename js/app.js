import IntroView from './views/intro-view';
import GreetingView from './views/greeting-view';
import RulesView from './views/rules-view';
import GameView from './views/game-view';
import StatsView from './views/stats-view';
import {changeScreen, getFrame, saveResult, setImagesSize, updateHeader} from './utils/util';
import updateInfo from './utils/update-info';
import introData from './data/intro-data';
import greetingData from './data/greeting-data';
import rulesData from './data/rules-data';
import gameData from './data/game-data';
import levelsData from './data/levels-data';

export default class Application {
  static showIntro() {
    const intro = new IntroView(introData);
    changeScreen(intro.element);
    intro.onClick = () => {
      Application.showGreeting();
    };
  }

  static showGreeting() {
    const greeting = new GreetingView(greetingData);
    changeScreen(greeting.element);
    greeting.onClick = () => {
      Application.showRules();
    };
  }

  static showRules() {
    const rules = new RulesView(rulesData, gameData);
    changeScreen(rules.element);
    rules.onClick = (userName) => {
      gameData.userName = userName;
      Application.showGame();
    };
    rules.onBack = () => {
      Application.showIntro();
    };
  }

  static showGame() {
    const game = new GameView(levelsData, gameData);
    changeScreen(game.element);

    const variants = game.element.querySelectorAll(`.game__option`);
    const frame = getFrame(variants[0]);
    setImagesSize(frame, game.element.querySelectorAll(`.game img`), levelsData[gameData.level]);
    game.setStats();

    game.onBack = () => {
      Application.showIntro();
    };
    game.onNext = (answers) => {
      saveResult(answers);
      updateInfo();
      updateHeader(gameData);
      if (gameData.lives === 0) {
        Application.showStats();
        return;
      }

      if (gameData.level < levelsData.length - 1) {
        gameData.level += 1;
        Application.showGame();
      } else {
        Application.showStats();
      }
    };
  }

  static showStats() {
    const stats = new StatsView(gameData);
    changeScreen(stats.element);

    stats.onBack = () => {
      Application.showIntro();
    };
  }
}
