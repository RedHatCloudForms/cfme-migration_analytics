import Immutable from 'seamless-immutable';
import {
  CALCULATE_SUMMARY_DATA,
  SELECT_PROVIDERS,
  SELECT_DETAILED_DATA,
  FETCH_MANIFEST_INFO,
  START_INVENTORY_BUNDLE,
  FETCH_BUNDLE_TASK
} from './constants';
import { functionLookupReducer, getHandlersForBasicFetchActions } from '../../../../../redux/helpers';
import { calculateSummaryData } from './helpers';
import { RESET_ALL_STATE } from '../../../../../redux/common/constants';

const fetchManifestInfo = getHandlersForBasicFetchActions(
  FETCH_MANIFEST_INFO,
  'isFetchingManifestInfo',
  'errorFetchingManifestInfo',
  'manifestInfo'
);

const startInventoryBundle = getHandlersForBasicFetchActions(
  START_INVENTORY_BUNDLE,
  'isStartingBundle',
  'errorStartingBundle',
  'bundleStartResult'
);

const fetchBundleTask = getHandlersForBasicFetchActions(
  FETCH_BUNDLE_TASK,
  'isFetchingBundleTask',
  'errorFetchingBundleTask',
  'bundleTask'
);

export const initialState = Immutable({
  ...fetchManifestInfo.initialState,
  summaryData: null,
  selectedProviders: [],
  detailedDataSelected: false,
  ...startInventoryBundle.initialState,
  ...fetchBundleTask.initialState
});

const actionHandlers = {
  ...fetchManifestInfo.actionHandlers,
  [CALCULATE_SUMMARY_DATA]: (state, action) => state.set('summaryData', calculateSummaryData(action.results)),
  [SELECT_PROVIDERS]: (state, action) => state.set('selectedProviders', action.selectedProviders),
  [SELECT_DETAILED_DATA]: (state, action) => state.set('detailedDataSelected', action.detailedDataSelected),
  ...startInventoryBundle.actionHandlers,
  ...fetchBundleTask.actionHandlers,
  [RESET_ALL_STATE]: () => initialState
};

export default functionLookupReducer(initialState, actionHandlers);
