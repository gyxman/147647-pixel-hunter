export const countTime = (game, remainingTime) => {
  if (remainingTime < 0) {
    return -1;
  }
  const newGame = Object.assign({}, game, {
    remainingTime,
  });
  return newGame.remainingTime;
};
