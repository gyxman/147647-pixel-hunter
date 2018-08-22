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

const arrayNormal2Lives = [
  {
    answer: false,
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

const arrayNormal1Lives = [
  {
    answer: false,
    time: `normal`
  },
  {
    answer: false,
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

const arrayNormal0Lives = [
  {
    answer: false,
    time: `normal`
  },
  {
    answer: false,
    time: `normal`
  },
  {
    answer: false,
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

const arraySlow = [
  {
    answer: true,
    time: `slow`
  },
  {
    answer: true,
    time: `slow`
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

const arrayFast = [
  {
    answer: true,
    time: `fast`
  },
  {
    answer: true,
    time: `fast`
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
      assert.equal(countPonts(arraySmall), -1);
    });

    it(`should return 1150 when 10 answers and 3 lifes`, () => {
      assert.equal(countPonts(arrayNormal), 1150);
    });

    it(`should return 1000 when 10 answers and 2 lifes`, () => {
      assert.equal(countPonts(arrayNormal2Lives), 1000);
    });

    it(`should return 850 when 10 answers and 1 lifes`, () => {
      assert.equal(countPonts(arrayNormal1Lives), 850);
    });

    it(`should return 700 when 10 answers and 0 lifes`, () => {
      assert.equal(countPonts(arrayNormal0Lives), 700);
    });

    it(`should return 1050 when 10 answers and 3 lifes and 2 slow time`, () => {
      assert.equal(countPonts(arraySlow), 1050);
    });

    it(`should return 1250 when 10 answers and 3 lifes and 2 fast time`, () => {
      assert.equal(countPonts(arrayFast), 1250);
    });
  });
});
