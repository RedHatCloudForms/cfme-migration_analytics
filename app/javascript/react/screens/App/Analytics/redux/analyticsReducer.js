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
  UPLOAD_MANIFEST,
  RESET_MANIFEST
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

const uploadManifest = getHandlersForBasicFetchActions(
  UPLOAD_MANIFEST,
  'isUploadingManifest',
  'errorUploadingManifest',
  'uploadManifestResult'
);

const resetManifest = getHandlersForBasicFetchActions(
  RESET_MANIFEST,
  'isResettingManifest',
  'errorResettingManifest',
  'resetManifestResult'
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
  ...uploadManifest.initialState,
  ...resetManifest.initialState,
  manifestUpdateModalVisible: false,
  summaryData: null,
  selectedProviders: [],
  detailedDataSelected: false,
  ...startInventoryBundle.initialState,
  ...fetchBundleTask.initialState
});

const actionHandlers = {
  ...fetchManifestInfo.actionHandlers,
  ...uploadManifest.actionHandlers,
  ...resetManifest.actionHandlers,
  [TOGGLE_MANIFEST_UPDATE_MODAL]: state => state.set('manifestUpdateModalVisible', !state.manifestUpdateModalVisible),
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
