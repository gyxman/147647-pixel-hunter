const QUESTION_COUNT = 10;
const LIFES_COUNT = 3;
const POINTS_COUNT = 1150;
const CURRENT_ANSWER_POINTS = 100;
const FAST_ANSWER_POINTS = 50;
const SLOW_ANSWER_POINTS = -50;
const LIFE_POINTS = 50;

export const countPonts = (array) => {
  let countCurrentAnswers = array.filter((elem) => elem.answer);
  let countFastAnswers = array.filter((elem) => elem.time === `fast`);
  let countSlowAnswers = array.filter((elem) => elem.time === `slow`);
  let countLifes = LIFES_COUNT - array.filter((elem) => !elem.answer).length;
  if (array.length < QUESTION_COUNT) {
    return -1;
  } else if (countFastAnswers === 0 && countSlowAnswers === 0 && countLifes === LIFES_COUNT) {
    return POINTS_COUNT;
  }
  return countCurrentAnswers.length * CURRENT_ANSWER_POINTS + countFastAnswers.length * FAST_ANSWER_POINTS + countSlowAnswers.length * SLOW_ANSWER_POINTS + countLifes * LIFE_POINTS;
};
