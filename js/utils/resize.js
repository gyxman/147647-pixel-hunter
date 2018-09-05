const resize = (frame, image) => {
  const newSize = {
    width: 0,
    height: 0,
  };

  if (image.width === image.height) {
    if (image.width > frame.width) {
      newSize.width = frame.width;
      newSize.height = frame.height;
    } else {
      newSize.width = image.width;
      newSize.height = image.height;
    }
  } else if (image.width > image.height) {
    const ratio = image.width / image.height;
    if (frame.width > frame.height) {
      if (image.width > frame.width && image.height > frame.height) {

      } else {

      }
    }

  }


  return newSize;
};

export default resize;
