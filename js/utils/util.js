import resize from './resize';
import GameData from '../data/game-data';
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
  GameData.answers.push({answer: checkAnswer(array), time: `normal`});
};
