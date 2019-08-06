import { mockStore } from '../../../common/testReduxHelpers';
import { resetAllStateAction } from '../commonActions';
import { RESET_ALL_STATE } from '../constants';

const store = mockStore();

afterEach(() => {
  store.clearActions();
});

describe('common actions', () => {
  test('reset all state action', () => {
    store.dispatch(resetAllStateAction());
    expect(store.getActions()).toEqual([{ type: RESET_ALL_STATE }]);
  });
});
