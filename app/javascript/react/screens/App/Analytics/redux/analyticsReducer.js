import Immutable from 'seamless-immutable';
import { CALCULATE_SUMMARY_DATA, SELECT_PROVIDERS, SELECT_DETAILED_DATA } from './constants';
import { functionLookupReducer } from '../../../../../redux/helpers';
import { calculateSummaryData } from './helpers';
import { RESET_ALL_STATE } from '../../../../../redux/common/constants';

export const initialState = Immutable({
  summaryData: null,
  selectedProviders: [],
  detailedDataSelected: false
});

const actionHandlers = {
  [CALCULATE_SUMMARY_DATA]: (state, action) => state.set('summaryData', calculateSummaryData(action.results)),
  [SELECT_PROVIDERS]: (state, action) => state.set('selectedProviders', action.selectedProviders),
  [SELECT_DETAILED_DATA]: (state, action) => state.set('detailedDataSelected', action.detailedDataSelected),
  [RESET_ALL_STATE]: () => initialState
};

export default functionLookupReducer(initialState, actionHandlers);
