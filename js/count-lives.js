export const countLives = (game, lives) => {
  if (lives < 0) {
    return -1;
  }
  const newGame = Object.assign({}, game, {
    lives,
  });
  return newGame.lives;
};
