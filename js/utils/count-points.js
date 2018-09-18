export const countPonts = (game, array) => {
  const countCurrentAnswers = array.filter((item) => item.answer);
  const countFastAnswers = array.filter((item) => item.time === `fast`);
  const countSlowAnswers = array.filter((item) => item.time === `slow`);
  const countLifes = game.lives - array.filter((item) => !item.answer).length;
  if (array.length < game.countQuestion) {
    return -1;
  }
  return countCurrentAnswers.length * game.currentAnswerPoints + countFastAnswers.length * game.fastAnswerPoints + countSlowAnswers.length * game.slowAnswerPoints + countLifes * game.lifePoints;
};
