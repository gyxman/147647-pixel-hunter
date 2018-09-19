// эта функция теперь используется только для тестов
export const countPonts = (game, array) => {
  const counts = {
    currentAnswers: 0,
    fastAnswers: 0,
    slowAnswers: 0,
    lifes: game.lives,
  };

  array.forEach((item) => {
    if (item.answer) {
      counts.currentAnswers += 1;
      if (item.time === `fast`) {
        counts.fastAnswers += 1;
      } else if (item.time === `slow`) {
        counts.slowAnswers += 1;
      }
    } else {
      counts.lifes -= 1;
    }
  });

  if (array.length < game.countQuestion) {
    return -1;
  }
  return counts.currentAnswers * game.currentAnswerPoints + counts.fastAnswers * game.fastAnswerPoints + counts.slowAnswers * game.slowAnswerPoints + counts.lifes * game.lifePoints;
};
