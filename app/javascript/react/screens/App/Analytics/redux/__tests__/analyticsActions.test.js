import { mockDispatch } from '../../../../../../common/testReduxHelpers';
import { calculateSummaryDataAction, selectProvidersAction, selectDetailedDataAction } from '../analyticsActions';
import { CALCULATE_SUMMARY_DATA, SELECT_PROVIDERS, SELECT_DETAILED_DATA } from '../constants';

describe('analytics redux actions', () => {
  test('constructs a simple action for calculating summary data', () => {
    const results = { mock: 'object' };
    const action = mockDispatch(calculateSummaryDataAction(results));
    expect(action.type).toBe(CALCULATE_SUMMARY_DATA);
    expect(action.results).toEqual(results);
  });

  test('constructs a simple action for selecting providers', () => {
    const selectedProviders = ['mock', 'array'];
    const action = mockDispatch(selectProvidersAction(selectedProviders));
    expect(action.type).toBe(SELECT_PROVIDERS);
    expect(action.selectedProviders).toEqual(selectedProviders);
  });

  test('constructs a simple action for selecting detailed data', () => {
    const action = mockDispatch(selectDetailedDataAction(true));
    expect(action.type).toBe(SELECT_DETAILED_DATA);
    expect(action.detailedDataSelected).toBe(true);
  });
});
