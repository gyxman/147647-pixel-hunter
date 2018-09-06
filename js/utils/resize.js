const resize = (frame, image) => {
  const newSize = {
    width: 0,
    height: 0,
  };

  const ratio = image.width / image.height;

  // в тестах не проверяется, что делать если передали маленькое изображение
  // и если убрать эту проверку, то оно увеличится во весь фрейм
  // это может ухудшить качество, поэтому оставим эту проверку
  if (image.width >= frame.width || image.height >= frame.height) {
    if (frame.width / ratio <= frame.height) {
      newSize.width = frame.width;
      newSize.height = frame.width / ratio;
    } else {
      newSize.width = frame.height * ratio;
      newSize.height = frame.height;
    }
  } else {
    newSize.width = image.width;
    newSize.height = image.height;
  }

  return newSize;
};

export default resize;
