import {assert} from 'chai';
import {changeLevel} from '../utils/change-level';
import {INITIAL_GAME} from '../data/initial-data';

describe(`change screen`, () => {
  it(`should return 3 when 3 screen`, () => {
    assert.equal(changeLevel(INITIAL_GAME, 3).level, 3);
  });

  it(`should not allow set negative values`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, -1).level, `Screen should be negative value`);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, []).level, `Screen should be of type number`);
  });
});
