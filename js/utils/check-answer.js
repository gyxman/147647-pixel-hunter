import levelsData from '../data/levels-data';

const checkAnswer = (game, answers) => {
  console.log(game);
  let isRight = true;
  const currentAnswers = levelsData[game.level].options.map((option) => {
    return option.answer;
  });

  [...answers].forEach((answer, index) => {
    if (answer !== currentAnswers[index]) {
      isRight = false;
    }
  });

  if (isRight) {
    //gameData.rightsAnswers += 1;
  }

  return Object.assign({}, game, {answers});
};

export default checkAnswer;
