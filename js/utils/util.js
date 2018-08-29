export const getElementFromTemplate = (template, tagName = `div`, tagClass) => {
  const wrapper = document.createElement(tagName);
  wrapper.innerHTML = template.trim();
  wrapper.setAttribute(`class`, tagClass || ``);
  return wrapper;
};

const mainElement = document.querySelector(`#main`);

export const changeScreen = (...elements) => {
  mainElement.innerHTML = ``;
  elements.forEach((element) => {
    mainElement.appendChild(element);
  });
};
