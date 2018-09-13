const preprocessAnswers = (answers) => answers.map((item) => {
  const answer = item.type;
  const [src, width, height] = [item.image.url, item.image.width, item.image.height];
  return {
    src,
    width,
    height,
    answer,
  };
});

export const adaptServerData = (data) => {
  for (const level of Object.values(data)) {
    level.answers = preprocessAnswers(level.answers);
  }

  return data;
};
