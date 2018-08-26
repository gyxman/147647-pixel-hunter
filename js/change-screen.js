const SCREEN_COUNT = 10;

export const changeScreen = (screen) => {
  let numberScreen = screen.newScreen;
  if (numberScreen > SCREEN_COUNT) {
    return -1;
  }
  return numberScreen;
};
