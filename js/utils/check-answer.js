import levelsData from '../data/levels-data';

const checkAnswer = (game, answers) => {
  if (!answers) {
    return false;
  }
  let isRight = true;
  const currentAnswers = levelsData[game.level].options.map((option) => {
    return option.answer;
  });

  [...answers].forEach((answer, index) => {
    if (answer !== currentAnswers[index]) {
      isRight = false;
    }
  });

  return isRight;
};

export default checkAnswer;
