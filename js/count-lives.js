export const countLives = (lifes) => {
  let numberLives = lifes.count;
  if (!numberLives) {
    return -1;
  }
  return (numberLives -= 1);
};
