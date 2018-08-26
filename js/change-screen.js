export const changeScreen = (game, screen) => {
  if (screen < 0) {
    return game.screen;
  }
  const newGame = Object.assign({}, game, {
    screen,
  });
  return newGame.screen;
};
