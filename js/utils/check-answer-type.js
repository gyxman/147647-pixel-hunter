const ANSWER_TYPE = {
  unknown: `stats__result--unknown`,
  wrong: `stats__result--wrong`,
  correct: `stats__result--correct`,
  fast: `stats__result--fast`,
  slow: `stats__result--slow`,
};

const checkAnswerType = (answer) => {
  switch (answer) {
    case `normal`:
      return ANSWER_TYPE.correct;
    case `fast`:
      return ANSWER_TYPE.fast;
    case `slow`:
      return ANSWER_TYPE.slow;
    case `wrong`:
      return ANSWER_TYPE.wrong;
  }

  return ANSWER_TYPE.unknown;
};

export default checkAnswerType;
