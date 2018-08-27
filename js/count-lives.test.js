import {assert} from 'chai';
import {countLives} from './count-lives';
import {INITIAL_GAME} from './start-data';

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
