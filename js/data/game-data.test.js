import {assert} from 'chai';
import {countPonts} from '../count-points';
import {countLives} from '../count-lives';
import {countTime} from '../count-time';
import {changeScreen} from '../change-screen';
import {INITIAL_GAME} from '../start-data';

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

describe(`count lives`, () => {
  it(`should return 3 when 3 lifes`, () => {
    assert.equal(countLives(INITIAL_GAME, 3).lives, 3);
  });

  it(`should not allow set negative values`, () => {
    assert.throws(() => countLives(INITIAL_GAME, -1).lives, `Lives should be negative value`);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => countLives(INITIAL_GAME, []).lives, `Lives should be of type number`);
  });
});

describe(`timer`, () => {
  it(`should return 10 when 10 seconds`, () => {
    assert.equal(countTime(INITIAL_GAME, 10).remainingTime, 10);
  });

  it(`should not allow set negative values`, () => {
    assert.throws(() => countTime(INITIAL_GAME, -1).remainingTime, `Time should be negative value`);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => countTime(INITIAL_GAME, []).remainingTime, `Time should be of type number`);
  });
});

describe(`change screen`, () => {
  it(`should return 3 when 3 screen`, () => {
    assert.equal(changeScreen(INITIAL_GAME, 3).screen, 3);
  });

  it(`should not allow set negative values`, () => {
    assert.throws(() => changeScreen(INITIAL_GAME, -1).screen, `Screen should be negative value`);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => changeScreen(INITIAL_GAME, []).screen, `Screen should be of type number`);
  });
});
