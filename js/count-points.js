export const countPonts = (game, array) => {
  let countCurrentAnswers = array.filter((elem) => elem.answer);
  let countFastAnswers = array.filter((elem) => elem.time === `fast`);
  let countSlowAnswers = array.filter((elem) => elem.time === `slow`);
  let countLifes = game.lives - array.filter((elem) => !elem.answer).length;
  if (array.length < game.countQuestion) {
    return -1;
  }
  return countCurrentAnswers.length * game.currentAnswerPoints + countFastAnswers.length * game.fastAnswerPoints + countSlowAnswers.length * game.slowAnswerPoints + countLifes * game.lifePoints;
};
