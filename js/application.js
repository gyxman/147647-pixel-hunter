import IntroView from './views/intro-view';
import GreetingView from './views/greeting-view';
import RulesView from './views/rules-view';
import StatsView from './views/stats-view';
import {changeScreen, saveResult} from './utils/util';
import introData from './data/intro-data';
import greetingData from './data/greeting-data';
import rulesData from './data/rules-data';
import gameData from './data/game-data';
import levelsData from './data/levels-data';
import GameModel from './game-model';
import GameScreen from './game-screen';
import updateInfo from './utils/update-info';

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
    const gameModel = new GameModel(gameData.userName);
    const gameScreen = new GameScreen(gameModel);
    changeScreen(gameScreen.element);
    gameScreen.startGame();

    gameScreen.onBack = () => {
      Application.showIntro();
    };
    // gameScreen.onNext = (answers) => {
    //   saveResult(answers);
    //   if (gameData.lives === 0) {
    //     Application.showStats();
    //     return;
    //   }
    //
    //   if (gameData.level < levelsData.length - 1) {
    //     gameData.level += 1;
    //     Application.showGame();
    //   } else {
    //     Application.showStats();
    //   }
    // };
  }

  static showStats() {
    const stats = new StatsView(gameData);
    changeScreen(stats.element);

    stats.onBack = () => {
      Application.showIntro();
    };
  }
}
