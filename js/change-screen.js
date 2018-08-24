const SCREEN_COUNT = 10;

export const changeScreen = (screenNumber) => {
  if (screenNumber > SCREEN_COUNT) {
    return -1;
  }
  return screenNumber;
};
