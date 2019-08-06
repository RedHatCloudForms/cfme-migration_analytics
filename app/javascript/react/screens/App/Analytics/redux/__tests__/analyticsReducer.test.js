import analyticsReducer, { initialState } from '../analyticsReducer';
import { CALCULATE_SUMMARY_DATA, SELECT_PROVIDERS, SELECT_DETAILED_DATA } from '../constants';
import { calculateSummaryData } from '../helpers';
import { RESET_ALL_STATE } from '../../../../../../redux/common/constants';

describe('analytics reducer', () => {
  test('calculate summary data', () => {
    const action = {
      type: CALCULATE_SUMMARY_DATA,
      results: {
        vmSummaryReportResult: { result_set: [] },
        envSummaryReportResult: { result_set: [] }
      }
    };
    expect(analyticsReducer(initialState, action).summaryData).toEqual(calculateSummaryData(action.results));
  });

  test('select providers', () => {
    const action = {
      type: SELECT_PROVIDERS,
      selectedProviders: ['dummy', 'array']
    };
    expect(analyticsReducer(initialState, action).selectedProviders).toEqual(action.selectedProviders);
  });

  test('select detailed data', () => {
    const action = {
      type: SELECT_DETAILED_DATA,
      detailedDataSelected: true
    };
    expect(analyticsReducer(initialState, action).detailedDataSelected).toBe(true);
  });

  test('reset all state', () => {
    const prevState = {
      ...initialState,
      summaryData: { dummy: 'object' },
      selectedProviders: ['dummy', 'array'],
      detailedDataSelected: true
    };
    const state = analyticsReducer(prevState, {
      type: RESET_ALL_STATE
    });
    expect(state).toEqual(initialState);
  });
});
