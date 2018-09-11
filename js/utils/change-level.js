export const changeLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Screen should be of type number`);
  }
  if (level < 0) {
    throw new Error(`Screen should be negative value`);
  }
  const newGame = Object.assign({}, game, {
    level,
  });
  return newGame;
};
