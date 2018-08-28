import {assert} from 'chai';
import {changeScreen} from '../screens/change-screen';
import {INITIAL_GAME} from '../data/initial-data';

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
