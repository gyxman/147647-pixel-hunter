import {assert} from 'chai';
import {countPonts} from '../count-points';

const arraySmall = [
  {
    answer: true,
    time: `normal`
  },
  {
    answer: true,
    time: `normal`
  },
  {
    answer: true,
    time: `normal`
  },
  {
    answer: true,
    time: `normal`
  },
  {
    answer: true,
    time: `normal`
  },
  {
    answer: true,
    time: `normal`
  },
  {
    answer: true,
    time: `normal`
  },
  {
    answer: true,
    time: `normal`
  },
  {
    answer: true,
    time: `normal`
  }
];

const arrayNormal = [
  {
    answer: true,
    time: `normal`
  },
  {
    answer: true,
    time: `normal`
  },
  {
    answer: true,
    time: `normal`
  },
  {
    answer: true,
    time: `normal`
  },
  {
    answer: true,
    time: `normal`
  },
  {
    answer: true,
    time: `normal`
  },
  {
    answer: true,
    time: `normal`
  },
  {
    answer: true,
    time: `normal`
  },
  {
    answer: true,
    time: `normal`
  },
  {
    answer: true,
    time: `normal`
  }
];

describe(`Game`, () => {
  describe(`count points`, () => {
    it(`should return -1 when less 10 answers`, () => {
      assert.equal(countPonts(arraySmall, 3), -1);
    });

    it(`should return 1150 when 10 answers and 3 lifes`, () => {
      assert.equal(countPonts(arrayNormal, 3), 1150);
    });

    it(`should return 1000 when 10 answers and 0 lifes`, () => {
      assert.equal(countPonts(arrayNormal, 0), 1000);
    });
  });
});
