import { mockStore, mockDispatch } from '../../../../../../common/testReduxHelpers';
import { mockRequest, mockReset } from '../../../../../../common/mockRequests';
import {
  calculateSummaryDataAction,
  selectProvidersAction,
  selectDetailedDataAction,
  fetchManifestInfoAction,
  startInventoryBundleAction,
  fetchBundleTaskAction,
  resetDataCollectionStateAction
} from '../analyticsActions';
import {
  CALCULATE_SUMMARY_DATA,
  SELECT_PROVIDERS,
  SELECT_DETAILED_DATA,
  FETCH_MANIFEST_INFO,
  MANIFEST_INFO_URL,
  FETCH_BUNDLE_TASK,
  RESET_DATA_COLLECTION_STATE,
  INVENTORY_BUNDLE_URL,
  START_INVENTORY_BUNDLE
} from '../constants';

const store = mockStore();

afterEach(() => {
  store.clearActions();
  mockReset();
});

describe('analytics redux actions', () => {
  test('constructs a basic action for fetching manifest info', () => {
    const action = mockDispatch(fetchManifestInfoAction());
    expect(action.type).toBe(FETCH_MANIFEST_INFO);
    expect(action.meta).toEqual({ href: MANIFEST_INFO_URL });
  });

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

  describe('start inventory bundle action', () => {
    const action = startInventoryBundleAction([1, 2]);

    test('is successful', () => {
      mockRequest({
        method: 'POST',
        url: INVENTORY_BUNDLE_URL,
        status: 200,
        response: { mock: 'response' }
      });
      return store.dispatch(action).then(() => {
        expect(store.getActions()).toEqual([
          {
            type: `${START_INVENTORY_BUNDLE}_PENDING`
          },
          {
            type: `${START_INVENTORY_BUNDLE}_FULFILLED`,
            payload: { mock: 'response' }
          }
        ]);
      });
    });

    test('is rejected', () => {
      mockRequest({
        method: 'POST',
        url: INVENTORY_BUNDLE_URL,
        status: 404
      });
      return store.dispatch(action).catch(() => {
        expect(store.getActions()).toEqual([
          {
            type: `${START_INVENTORY_BUNDLE}_PENDING`
          },
          {
            type: `${START_INVENTORY_BUNDLE}_REJECTED`,
            error: true,
            payload: new Error('<mocked error>')
          }
        ]);
      });
    });
  });

  test('constructs an action for fetching the bundle task', () => {
    const action = mockDispatch(fetchBundleTaskAction('/api/foo/1'));
    expect(action.type).toBe(FETCH_BUNDLE_TASK);
    expect(action.meta).toEqual({ href: '/api/foo/1' });
  });

  test('constructs a basic action for resetting data collection state', () => {
    const action = mockDispatch(resetDataCollectionStateAction());
    expect(action).toEqual({ type: RESET_DATA_COLLECTION_STATE });
  });
});
