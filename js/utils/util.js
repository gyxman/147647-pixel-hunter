import resize from './resize';
import checkAnswer from './check-answer';

export const getElementFromTemplate = (template, tagName = `div`, tagClass) => {
  const wrapper = document.createElement(tagName);
  wrapper.innerHTML = template.trim();
  wrapper.setAttribute(`class`, tagClass || ``);
  return wrapper;
};

const mainElement = document.querySelector(`#main`);

export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

export const showModal = (element, className) => {
  if (!document.body.querySelector(className)) {
    document.body.appendChild(element);
  }
};

export const closeModal = (element) => {
  document.body.querySelector(element).remove();
};

export const getFrame = (element) => {
  return {
    'width': element.clientWidth,
    'height': element.clientHeight,
  };
};

export const setImagesSize = (frame, images, data) => {
  images.forEach((image, index) => {
    image.setAttribute(`width`, resize(frame, {'width': data.answers[index].width, 'height': data.answers[index].height}).width);
    image.setAttribute(`height`, resize(frame, {'width': data.answers[index].width, 'height': data.answers[index].height}).height);
  });
};

export const calculateResults = (data)=> {
  const result = {};
  result.countRightAnswers = data.answers.map((item) => item !== `wrong` ? 1 : 0).reduce((sum, item) => sum + item);
  result.countFastAnswers = data.answers.map((item) => item === `fast` ? 1 : 0).reduce((sum, item) => sum + item);
  result.countSlowAnswers = data.answers.map((item) => item === `slow` ? 1 : 0).reduce((sum, item) => sum + item);
  result.countRightPoints = result.countRightAnswers * data.currentAnswerPoints;
  result.countFastPoints = result.countFastAnswers * data.fastAnswerPoints;
  result.countSlowPoints = result.countSlowAnswers * data.slowAnswerPoints;
  result.countLivesPoints = data.lives * data.lifePoints;
  result.countTotalPoints = result.countRightPoints + result.countFastPoints + result.countSlowPoints + result.countLivesPoints;

  return result;
};

export const saveResult = (data, game, array, time) => {
  let answer;
  if (checkAnswer(data, game, array)) {
    if (time > 20) {
      answer = `fast`;
    } else if (time < 10) {
      answer = `slow`;
    } else {
      answer = `correct`;
    }
  } else {
    answer = `wrong`;
  }
  const answers = [...game.answers, answer];
  return Object.assign({}, game, {answers});
};

export const tick = (game) => {
  const timeLeft = game.remainingTime - 1;
  return Object.assign({}, game, {remainingTime: timeLeft});
};

export const isDebug = () => window.location.hash === `#debug`;
