import Immutable from 'seamless-immutable';
import {
  CALCULATE_SUMMARY_DATA,
  SELECT_PROVIDERS,
  SELECT_DETAILED_DATA,
  FETCH_MANIFEST_INFO,
  TOGGLE_MANIFEST_UPDATE_MODAL,
  START_INVENTORY_BUNDLE,
  FETCH_BUNDLE_TASK,
  RESET_DATA_COLLECTION_STATE,
  CHANGE_MANIFEST
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

const changeManifest = getHandlersForBasicFetchActions(
  CHANGE_MANIFEST,
  'isChangingManifest',
  'errorChangingManifest',
  'changeManifestResult'
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
  ...changeManifest.initialState,
  manifestUpdateModalVisible: false,
  summaryData: null,
  selectedProviders: [],
  detailedDataSelected: false,
  ...startInventoryBundle.initialState,
  ...fetchBundleTask.initialState
});

const actionHandlers = {
  ...fetchManifestInfo.actionHandlers,
  ...changeManifest.actionHandlers,
  [TOGGLE_MANIFEST_UPDATE_MODAL]: (state, action) =>
    state.set('manifestUpdateModalVisible', action.show !== null ? action.show : !state.manifestUpdateModalVisible),
  [CALCULATE_SUMMARY_DATA]: (state, action) => state.set('summaryData', calculateSummaryData(action.results)),
  [SELECT_PROVIDERS]: (state, action) => state.set('selectedProviders', action.selectedProviders),
  [SELECT_DETAILED_DATA]: (state, action) => state.set('detailedDataSelected', action.detailedDataSelected),
  ...startInventoryBundle.actionHandlers,
  ...fetchBundleTask.actionHandlers,
  [RESET_DATA_COLLECTION_STATE]: state =>
    Immutable.merge(state, {
      ...startInventoryBundle.initialState,
      ...fetchBundleTask.initialState
    }),
  [RESET_ALL_STATE]: () => initialState
};

export default functionLookupReducer(initialState, actionHandlers);
