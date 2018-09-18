import {assert} from 'chai';
import {countPonts} from '../utils/count-points';
import {INITIAL_GAME} from '../data/initial-data';

// Заполним тестовые данные
const smallAnswers = Array(9).fill(0).map(() => ({answer: true, time: `normal`}));

const normalAnswers = Array(10).fill(0).map(() => ({answer: true, time: `normal`}));

const normalAnswers2Lives = Array(10).fill(0).map(() => ({answer: true, time: `normal`}));
normalAnswers2Lives[0].answer = false;

const slowAnswers = Array(10).fill(0).map(() => ({answer: true, time: `normal`}));
slowAnswers[0].time = `slow`;
slowAnswers[1].time = `slow`;

const fastAnswers = Array(10).fill(0).map(() => ({answer: true, time: `normal`}));
fastAnswers[0].time = `fast`;
fastAnswers[1].time = `fast`;

describe(`count points`, () => {
  it(`should return -1 when less 10 answers`, () => {
    assert.equal(countPonts(INITIAL_GAME, smallAnswers), -1);
  });

  it(`should return 1150 when 10 answers and 3 lifes`, () => {
    assert.equal(countPonts(INITIAL_GAME, normalAnswers), 1150);
  });

  it(`should return 1000 when 10 answers and 2 lifes`, () => {
    assert.equal(countPonts(INITIAL_GAME, normalAnswers2Lives), 1000);
  });

  it(`should return 1050 when 10 answers and 3 lifes and 2 slow time`, () => {
    assert.equal(countPonts(INITIAL_GAME, slowAnswers), 1050);
  });

  it(`should return 1250 when 10 answers and 3 lifes and 2 fast time`, () => {
    assert.equal(countPonts(INITIAL_GAME, fastAnswers), 1250);
  });
});
