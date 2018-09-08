import IntroView from './views/intro-view';
import GreetingView from './views/greeting-view';
import RulesView from './views/rules-view';
import {changeScreen} from './utils/util';
import IntroData from './data/intro-data';
import GreetingData from './data/greeting-data';
import RulesData from './data/rules-data';

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
    const rules = new RulesView(RulesData);
    changeScreen(rules.element);
    rules.onClick = (userName) => {
      console.log(userName);
    };
  }
}
