import IntroView from './views/intro-view';
import GreetingView from './views/greeting-view';
import RulesView from './views/rules-view';
import StatsView from './views/stats-view';
import {changeScreen, closeModal, showModal} from './utils/util';
import introData from './data/intro-data';
import greetingData from './data/greeting-data';
import rulesData from './data/rules-data';
import {INITIAL_GAME} from './data/initial-data';
import GameModel from './game-model';
import GameScreen from './game-screen';
import SplashScreen from './splash-screen';
import ErrorView from './views/error-view';
import ConfirmView from './views/confirm-view';
import Loader from './utils/loader';

let questData;
export default class Application {
  static start() {
    const splashScreen = new SplashScreen();
    changeScreen(splashScreen.element);
    splashScreen.start();

    Loader.loadData().
    then((data) => {
      questData = data;
    }).
    then(() => Application.showIntro()).
    catch(Application.showError).
    then(() => splashScreen.stop());
  }

  static showIntro() {
    const introScreen = new IntroView(introData);
    changeScreen(introScreen.element);
    introScreen.onClick = () => {
      Application.showGreeting();
    };
  }

  static showGreeting() {
    const greetingScreen = new GreetingView(greetingData);
    changeScreen(greetingScreen.element);
    greetingScreen.onClick = () => {
      Application.showRules();
    };
  }

  static showRules() {
    const rulesScreen = new RulesView(rulesData, INITIAL_GAME);
    changeScreen(rulesScreen.element);
    rulesScreen.onClick = (userName) => {
      Application.showGame(userName);
    };
    rulesScreen.onBack = () => {
      Application.showGreeting();
    };
  }

  static showGame(userName) {
    const gameModel = new GameModel(questData, userName);
    const gameScreen = new GameScreen(gameModel);
    changeScreen(gameScreen.element);
    gameScreen.startGame();

    gameScreen.onBack = () => {
      Application.showConfirm(gameScreen);
    };

    gameScreen.onEndGame = (data) => {
      Application.showStats(data);
    };
  }

  static showStats(model) {
    const userName = model.userName;
    const statsScreen = new StatsView();
    changeScreen(statsScreen.element);

    Loader.saveResults(model.answers, model.lives, userName).
    then(() => Loader.loadResults(userName)).
    then((data) => statsScreen.showScores(data, userName)).
    catch(Application.showError);

    statsScreen.onRepeat = () => {
      Application.showGreeting();
    };

    statsScreen.onBack = () => {
      Application.showGreeting();
    };
  }

  static showError(error) {
    const errorScreen = new ErrorView(error);
    changeScreen(errorScreen.element);
  }

  static showConfirm(game) {
    const confirmScreen = new ConfirmView();
    showModal(confirmScreen.element, `.modal`);

    confirmScreen.onResetGame = () => {
      game.resetTimer();
      Application.showGreeting();
      confirmScreen.onClose();
    };
    confirmScreen.onClose = () => {
      closeModal(`.modal`);
    };
  }
}
