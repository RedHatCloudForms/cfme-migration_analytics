import providersReducer, { initialState } from '../providersReducer';
import { FETCH_PROVIDERS } from '../constants';
import { RESET_ALL_STATE } from '../../common/constants';

describe('providers reducer', () => {
  test('calls an action handler for fetchProviders', () => {
    const state = providersReducer(initialState, { type: `${FETCH_PROVIDERS}_PENDING` });
    expect(state.isFetchingProviders).toBe(true);
  });

  test('resets all state', () => {
    const prevState = {
      isFetchingProviders: true,
      errorFetchingProviders: 'some error',
      providers: [{ mock: 'provider' }]
    };
    const state = providersReducer(prevState, { type: RESET_ALL_STATE });
    expect(state).toEqual(initialState);
  });
});
