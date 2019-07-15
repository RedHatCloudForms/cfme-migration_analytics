import Immutable from 'seamless-immutable';
import { CALCULATE_SUMMARY_DATA } from './constants';
import { functionLookupReducer } from '../../../../../redux/helpers';
import { calculateSummaryData } from './helpers';
import { RESET_ALL_STATE } from '../../../../../redux/common/constants';

export const initialState = Immutable({
  summaryData: null
});

const actionHandlers = {
  [CALCULATE_SUMMARY_DATA]: (state, action) => state.set('summaryData', calculateSummaryData(action.results)),
  [RESET_ALL_STATE]: () => initialState
};

export default functionLookupReducer(initialState, actionHandlers);
