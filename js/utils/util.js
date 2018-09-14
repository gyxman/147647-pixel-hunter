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
  images.forEach((img, index) => {
    img.setAttribute(`width`, resize(frame, {'width': data.answers[index].width, 'height': data.answers[index].height}).width);
    img.setAttribute(`height`, resize(frame, {'width': data.answers[index].width, 'height': data.answers[index].height}).height);
  });
};

export const saveResult = (data, game, array, time) => {
  const answers = [...game.answers];
  if (checkAnswer(data, game, array)) {
    if (time > 20) {
      answers.push(`fast`);
    } else if (time < 10) {
      answers.push(`slow`);
    } else {
      answers.push(`correct`);
    }
  } else {
    answers.push(`wrong`);
  }
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
