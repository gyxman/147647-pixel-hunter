import {assert} from 'chai';
import {countTime} from './count-time';
import {INITIAL_GAME} from './start-data';

describe(`count time`, () => {
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
