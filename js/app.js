import IntroView from './views/intro-view';
import GreetingView from './views/greeting-view';
import RulesView from './views/rules-view';
import GameView from './views/game-view';
import {changeScreen, changeLevel} from './utils/util';
import IntroData from './data/intro-data';
import GreetingData from './data/greeting-data';
import RulesData from './data/rules-data';
import GameData from './data/game-data';
import LevelsData from './data/levels-data';

export default class Application {
  static showIntro() {
    const intro = new IntroView(IntroData);
    changeScreen(intro.element);
    intro.onClick = () => {
      Application.showGreeting();
    };
  }

  static showGreeting() {
    const greeting = new GreetingView(GreetingData);
    changeScreen(greeting.element);
    greeting.onClick = () => {
      Application.showRules();
    };
  }

  static showRules() {
    const rules = new RulesView(RulesData, GameData);
    changeScreen(rules.element);
    rules.onClick = (userName) => {
      Application.showGame();
    };
    rules.onBack = () => {
      Application.showIntro();
    };
  }

  static showGame() {
    const game = new GameView(LevelsData, GameData);
    changeScreen(game.element);
    changeLevel(game.partTemplate, LevelsData, GameData);

    game.onBack = () => {
      Application.showIntro();
    };
    game.onNext = (answers) => {
      console.log(answers);
    };
  }
}
