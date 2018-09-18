export const countPonts = (game, array) => {
  let countCurrentAnswers = array.filter((item) => item.answer);
  let countFastAnswers = array.filter((item) => item.time === `fast`);
  let countSlowAnswers = array.filter((item) => item.time === `slow`);
  let countLifes = game.lives - array.filter((item) => !item.answer).length;
  if (array.length < game.countQuestion) {
    return -1;
  }
  return countCurrentAnswers.length * game.currentAnswerPoints + countFastAnswers.length * game.fastAnswerPoints + countSlowAnswers.length * game.slowAnswerPoints + countLifes * game.lifePoints;
};
