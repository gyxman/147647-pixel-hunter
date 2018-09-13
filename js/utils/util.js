import resize from './resize';
import checkAnswer from './check-answer';
import getHeader from "../parts/header";

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

export const getFrame = (element) => {
  return {
    'width': element.clientWidth,
    'height': element.clientHeight,
  };
};

export const setImagesSize = (frame, images, data) => {
  images.forEach((img, index) => {
    img.setAttribute(`width`, resize(frame, {'width': data.answers[index].width, 'height': data.answers[index].height}).width);
    img.setAttribute(`height`, resize(frame, {'width': data.answers[index].width, 'height': data.answers[index].height}).height);
  });
};

export const saveResult = (data, game, array, time) => {
  if (time > 20) {
    time = `fast`;
  } else if (time < 10) {
    time = `slow`;
  } else {
    time = `normal`;
  }
  const answers = [...game.answers, {answer: checkAnswer(data, game, array), time}];
  return Object.assign({}, game, {answers});
};

export const updateHeader = (initialData) => {
  const header = document.querySelector(`.header`);
  header.innerHTML = ``;
  header.innerHTML = `${getHeader(initialData)}`;
};

export const tick = (game) => {
  const timeLeft = game.remainingTime - 1;
  return Object.assign({}, game, {remainingTime: timeLeft});
};
