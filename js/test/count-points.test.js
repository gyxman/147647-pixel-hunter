import {assert} from 'chai';
import {countPonts} from '../utils/count-points';
import {INITIAL_GAME} from '../data/initial-data';

// Заполним тестовые данные
const arraySmall = Array(9).fill(0).map(() => ({answer: true, time: `normal`}));

const arrayNormal = Array(10).fill(0).map(() => ({answer: true, time: `normal`}));

const arrayNormal2Lives = Array(10).fill(0).map(() => ({answer: true, time: `normal`}));
arrayNormal2Lives[0].answer = false;

const arraySlow = Array(10).fill(0).map(() => ({answer: true, time: `normal`}));
arraySlow[0].time = `slow`;
arraySlow[1].time = `slow`;

const arrayFast = Array(10).fill(0).map(() => ({answer: true, time: `normal`}));
arrayFast[0].time = `fast`;
arrayFast[1].time = `fast`;

describe(`count points`, () => {
  it(`should return -1 when less 10 answers`, () => {
    assert.equal(countPonts(INITIAL_GAME, arraySmall), -1);
  });

  it(`should return 1150 when 10 answers and 3 lifes`, () => {
    assert.equal(countPonts(INITIAL_GAME, arrayNormal), 1150);
  });

  it(`should return 1000 when 10 answers and 2 lifes`, () => {
    assert.equal(countPonts(INITIAL_GAME, arrayNormal2Lives), 1000);
  });

  it(`should return 1050 when 10 answers and 3 lifes and 2 slow time`, () => {
    assert.equal(countPonts(INITIAL_GAME, arraySlow), 1050);
  });

  it(`should return 1250 when 10 answers and 3 lifes and 2 fast time`, () => {
    assert.equal(countPonts(INITIAL_GAME, arrayFast), 1250);
  });
});
