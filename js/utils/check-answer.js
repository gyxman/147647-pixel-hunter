const checkTypeAnswer = (title) => {
  if (title === `Найдите фото среди изображений`) {
    return `photo`;
  }
  return `painting`;
};

const checkAnswer = (data, game, answers) => {
  if (!answers) {
    return false;
  }

  let isRight = true;
  let currentAnswers;
  if (data[game.level].type === `one-of-three`) {
    currentAnswers = [checkTypeAnswer(data[game.level].question)];
  } else {
    currentAnswers = data[game.level].answers.map((option) => {
      return option.answer;
    });
  }

  [...answers].forEach((answer, index) => {
    if (answer !== currentAnswers[index]) {
      isRight = false;
    }
  });

  return isRight;
};

export default checkAnswer;
