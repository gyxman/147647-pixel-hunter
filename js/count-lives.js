export const countLives = (lifesCount) => {
  if (!lifesCount) {
    return -1;
  }
  return (lifesCount -= 1);
};
