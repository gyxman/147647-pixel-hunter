import IntroView from './views/intro-view';
import GreetingView from './views/greeting-view';
import RulesView from './views/rules-view';
import GameView from './views/game-view';
import {changeScreen, getFrame, saveResult, setImagesSize} from './utils/util';
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
      GameData.userName = userName;
      Application.showGame();
    };
    rules.onBack = () => {
      Application.showIntro();
    };
  }

  static showGame() {
    const game = new GameView(LevelsData, GameData);
    changeScreen(game.element);

    const variants = game.element.querySelectorAll(`.game__option`);
    const frame = getFrame(variants[0]);
    setImagesSize(frame, game.element.querySelectorAll(`.game img`), LevelsData[GameData.level]);

    game.onBack = () => {
      Application.showIntro();
    };
    game.onNext = (answers) => {
      saveResult(answers);

      if (GameData.level < LevelsData.length - 1) {
        GameData.level += 1;
        Application.showGame();
      } else {
        console.log(1);
      }
    };
  }
}
