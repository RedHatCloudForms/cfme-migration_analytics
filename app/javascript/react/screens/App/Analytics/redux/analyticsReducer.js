import Immutable from 'seamless-immutable';
import { CALCULATE_SUMMARY_DATA, SELECT_PROVIDERS, SELECT_DETAILED_DATA, FETCH_MANIFEST_INFO } from './constants';
import { functionLookupReducer, getHandlersForBasicFetchActions } from '../../../../../redux/helpers';
import { calculateSummaryData } from './helpers';
import { RESET_ALL_STATE } from '../../../../../redux/common/constants';

const fetchManifestInfo = getHandlersForBasicFetchActions(
  FETCH_MANIFEST_INFO,
  'isFetchingManifestInfo',
  'errorFetchingManifestInfo',
  'manifestInfo'
);

export const initialState = Immutable({
  ...fetchManifestInfo.initialState,
  summaryData: null,
  selectedProviders: [],
  detailedDataSelected: false
});

const actionHandlers = {
  ...fetchManifestInfo.actionHandlers,
  [CALCULATE_SUMMARY_DATA]: (state, action) => state.set('summaryData', calculateSummaryData(action.results)),
  [SELECT_PROVIDERS]: (state, action) => state.set('selectedProviders', action.selectedProviders),
  [SELECT_DETAILED_DATA]: (state, action) => state.set('detailedDataSelected', action.detailedDataSelected),
  [RESET_ALL_STATE]: () => initialState
};

export default functionLookupReducer(initialState, actionHandlers);
