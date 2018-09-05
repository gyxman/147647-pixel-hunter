export const countLives = (game, lives) => {
  if (typeof lives !== `number`) {
    throw new Error(`Lives should be of type number`);
  }
  if (lives < 0) {
    throw new Error(`Lives should be negative value`);
  }
  const newGame = Object.assign({}, game, {
    lives,
  });
  return newGame;
};
