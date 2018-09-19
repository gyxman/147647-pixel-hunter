import {adaptServerData} from '../data/data-adapter.js';
import {calculateResults} from './util';

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;

const DEFAULT_NAME = `Безымянный`;
const APP_ID = 2071991;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const getJSON = (response) => response.json();

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`).then(checkStatus).then(getJSON).then(adaptServerData);
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`).then(checkStatus).then(getJSON);
  }

  static saveResults(game, name = DEFAULT_NAME) {
    const answers = game.answers;
    const lives = game.lives;
    const result = calculateResults(game);
    const data = Object.assign({}, {answers}, {lives}, {countRightAnswers: result.countRightAnswers}, {countFastAnswers: result.countFastAnswers}, {countSlowAnswers: result.countSlowAnswers}, {countRightPoints: result.countRightPoints}, {countFastPoints: result.countFastPoints}, {countSlowPoints: result.countSlowPoints}, {countLivesPoints: result.countLivesPoints}, {countTotalPoints: result.countTotalPoints});
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings).then(checkStatus);
  }
}
