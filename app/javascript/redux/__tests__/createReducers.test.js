import createReducers from '../createReducers';

describe('create reducers', () => {
  test('produces a properly combined initial state', () => {
    const initialState = createReducers().migrationAnalytics();
    expect(initialState).toMatchSnapshot();
  });
});
