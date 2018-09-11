import resize from './resize';
import gameData from '../data/game-data';
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
    img.setAttribute(`width`, resize(frame, {'width': data.options[index].width, 'height': data.options[index].height}).width);
    img.setAttribute(`height`, resize(frame, {'width': data.options[index].width, 'height': data.options[index].height}).height);
  });
};

export const saveResult = (array) => {
  gameData.answers.push({answer: checkAnswer(array), time: `normal`});
};

export const updateHeader = (initialData) => {
  const header = document.querySelector(`.header`);
  header.innerHTML = ``;
  header.innerHTML = `${getHeader(initialData)}`;
};
