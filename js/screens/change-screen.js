export const changeScreen = (game, screen) => {
  if (typeof screen !== `number`) {
    throw new Error(`Screen should be of type number`);
  }
  if (screen < 0) {
    throw new Error(`Screen should be negative value`);
  }
  const newGame = Object.assign({}, game, {
    screen,
  });
  return newGame;
};
