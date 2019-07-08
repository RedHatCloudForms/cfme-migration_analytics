import Immutable from 'seamless-immutable';
import { CALCULATE_SUMMARY_DATA } from './constants';
import { functionLookupReducer } from '../../../../../redux/helpers';
import { calculateSummaryData } from './helpers';

export const initialState = Immutable({
  summaryData: null
});

const actionHandlers = {
  [CALCULATE_SUMMARY_DATA]: (state, action) => state.set('summaryData', calculateSummaryData(action.results))
};

export default functionLookupReducer(initialState, actionHandlers);
