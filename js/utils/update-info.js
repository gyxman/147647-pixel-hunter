import gameData from '../data/game-data';

const updateInfo = () => {
  let errors = 0;
  gameData.answers.forEach((answer) => {
    if (!answer.answer) {
      errors += 1;
    }
  });

  gameData.lives = gameData.lives - errors;
};

export default updateInfo;
