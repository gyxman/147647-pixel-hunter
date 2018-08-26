export const countTime = (game, remainingTime) => {
  if (typeof remainingTime !== `number`) {
    throw new Error(`Time should be of type number`);
  }
  if (remainingTime < 0) {
    throw new Error(`Time should be negative value`);
  }
  const newGame = Object.assign({}, game, {
    remainingTime,
  });
  return newGame;
};
