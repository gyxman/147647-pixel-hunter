const AnswerType = {
  UNKNOWN: `stats__result--unknown`,
  WRONG: `stats__result--wrong`,
  CORRECT: `stats__result--correct`,
  FAST: `stats__result--fast`,
  SLOW: `stats__result--slow`,
};

const checkAnswerType = (answer) => {
  if (!answer) {
    return AnswerType.UNKNOWN;
  }

  switch (answer) {
    case `correct`:
      return AnswerType.CORRECT;
    case `fast`:
      return AnswerType.FAST;
    case `slow`:
      return AnswerType.SLOW;
  }

  return AnswerType.WRONG;
};

export default checkAnswerType;
