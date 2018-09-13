const ANSWER_TYPE = {
  unknown: `stats__result--unknown`,
  wrong: `stats__result--wrong`,
  correct: `stats__result--correct`,
  fast: `stats__result--fast`,
  slow: `stats__result--slow`,
};

const checkAnswerType = (answer) => {
  if (!answer) {
    return ANSWER_TYPE.unknown;
  }

  if (answer.answer) {
    switch (answer.time) {
      case `normal`:
        return ANSWER_TYPE.correct;
      case `fast`:
        return ANSWER_TYPE.fast;
      case `slow`:
        return ANSWER_TYPE.slow;
    }
  }

  return ANSWER_TYPE.wrong;
};

export default checkAnswerType;
