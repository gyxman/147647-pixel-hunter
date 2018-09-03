import gameData from '../data/game-data';
import {INITIAL_GAME} from '../data/initial-data';

const updateInfo = () => {
  let errors = 0;
  gameData.answers.forEach((answer) => {
    if (!answer.answer) {
      errors += 1;
    }
  });
  gameData.lives = INITIAL_GAME.lives - errors;
};

export default updateInfo;
