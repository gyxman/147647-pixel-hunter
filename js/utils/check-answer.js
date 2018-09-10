import gameData from '../data/game-data';
import levelsData from '../data/levels-data';

const checkAnswer = (answers) => {
  let isRight = true;
  const currentAnswers = levelsData[gameData.level].options.map((option) => {
    return option.answer;
  });

  [...answers].forEach((answer, index) => {
    if (answer !== currentAnswers[index]) {
      isRight = false;
    }
  });

  if (isRight) {
    gameData.rightsAnswers += 1;
  }

  return isRight;
};

export default checkAnswer;
