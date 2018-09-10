import resize from './resize';

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

const getFrame = (element) => {
  return {
    'width': element.clientWidth,
    'height': element.clientHeight,
  };
};

const setImagesSize = (frame, images, data) => {
  images.forEach((img, index) => {
    img.setAttribute(`width`, resize(frame, {'width': data.options[index].width, 'height': data.options[index].height}).width);
    img.setAttribute(`height`, resize(frame, {'width': data.options[index].width, 'height': data.options[index].height}).height);
  });
};

export const changeLevel = (element, data, gameData) => {
  const levelElement = document.querySelector(`.game`);
  levelElement.innerHTML = ``;
  levelElement.innerHTML = element;

  const variants = levelElement.querySelectorAll(`.game__option`);
  const frame = getFrame(variants[0]);
  setImagesSize(frame, levelElement.querySelectorAll(`.game img`), data[gameData.level]);
};
