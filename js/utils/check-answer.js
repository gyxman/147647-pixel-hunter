import GameData from '../data/game-data';
import LevelsData from '../data/levels-data';

const checkAnswer = (answers) => {
  let isRight = true;
  const currentAnswers = LevelsData[GameData.level].options.map((option) => {
    return option.answer;
  });

  [...answers].forEach((answer, index) => {
    if (answer !== currentAnswers[index]) {
      isRight = false;
    }
  });

  if (isRight) {
    GameData.rightsAnswers += 1;
  }

  return isRight;
};

export default checkAnswer;
