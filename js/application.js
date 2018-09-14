import IntroView from './views/intro-view';
import GreetingView from './views/greeting-view';
import RulesView from './views/rules-view';
import StatsView from './views/stats-view';
import {changeScreen} from './utils/util';
import introData from './data/intro-data';
import greetingData from './data/greeting-data';
import rulesData from './data/rules-data';
import {INITIAL_GAME} from './data/initial-data';
import GameModel from './game-model';
import GameScreen from './game-screen';
import SplashScreen from './splash-screen';
import ErrorScreen from './error-screen';
import Loader from './utils/loader';

let questData;
export default class Application {
  static start() {
    const splash = new SplashScreen();
    changeScreen(splash.element);
    splash.start();

    Loader.loadData().
    then((data) => questData = data).
    then(() => Application.showIntro()).
    catch(Application.showError).
    then(() => splash.stop());
  }

  static showIntro() {
    const intro = new IntroView(introData);
    changeScreen(intro.element);
    intro.onClick = () => {
      //Application.showGreeting();

      Application.showStats();
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
    const rules = new RulesView(rulesData, INITIAL_GAME);
    changeScreen(rules.element);
    rules.onClick = (userName) => {
      Application.showGame(userName);
    };
    rules.onBack = () => {
      Application.showGreeting();
    };
  }

  static showGame(userName) {
    const gameModel = new GameModel(questData, userName);
    const gameScreen = new GameScreen(gameModel);
    changeScreen(gameScreen.element);
    gameScreen.startGame();

    gameScreen.onBack = () => {
      Application.showGreeting();
    };

    gameScreen.onEndGame = (data) => {
      Application.showStats(data);
    };
  }

  static showStats(model) {
    const stats = new StatsView();
    changeScreen(stats.element);

    stats.showScores([{
      date: new Date(),
      stats: [`correct`, `wrong`, `fast`, `slow`, `correct`, `wrong`, `fast`, `slow`, `correct`, `wrong`],
      lives: 3
    }]);

    stats.onBack = () => {
      Application.showGreeting();
    };
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    changeScreen(errorScreen.element);
  }
}
