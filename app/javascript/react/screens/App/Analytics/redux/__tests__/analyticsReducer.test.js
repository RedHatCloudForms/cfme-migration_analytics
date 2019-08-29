import analyticsReducer, { initialState } from '../analyticsReducer';
import {
  CALCULATE_SUMMARY_DATA,
  SELECT_PROVIDERS,
  SELECT_DETAILED_DATA,
  RESET_DATA_COLLECTION_STATE,
  FETCH_MANIFEST_INFO,
  START_INVENTORY_BUNDLE,
  FETCH_BUNDLE_TASK
} from '../constants';
import { calculateSummaryData } from '../helpers';
import { RESET_ALL_STATE } from '../../../../../../redux/common/constants';

describe('analytics reducer', () => {
  test('constructs initial state correctly', () => {
    expect(initialState).toMatchSnapshot();
  });

  test('calls an action handler for fetchManifestInfo', () => {
    const state = analyticsReducer(initialState, { type: `${FETCH_MANIFEST_INFO}_PENDING` });
    expect(state.isFetchingManifestInfo).toBe(true);
  });

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

  test('calls an action handler for startInventoryBundle', () => {
    const state = analyticsReducer(initialState, { type: `${START_INVENTORY_BUNDLE}_PENDING` });
    expect(state.isStartingBundle).toBe(true);
  });

  test('calls an action handler for fetchBundleTask', () => {
    const state = analyticsReducer(initialState, { type: `${FETCH_BUNDLE_TASK}_PENDING` });
    expect(state.isFetchingBundleTask).toBe(true);
  });

  test('reset data collection state', () => {
    const prevState = {
      ...initialState,
      isStartingBundle: true,
      isFetchingBundleTask: true
    };
    const state = analyticsReducer(prevState, {
      type: RESET_DATA_COLLECTION_STATE
    });
    expect(state).toEqual(initialState);
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
