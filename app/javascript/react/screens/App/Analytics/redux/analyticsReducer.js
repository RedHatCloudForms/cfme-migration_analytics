import Immutable from 'seamless-immutable';
import { PROCESS_SUMMARY_DATA } from './constants';
import { functionLookupReducer } from '../../../../../redux/helpers';
import { processReportResults } from './helpers';

export const initialState = Immutable({
  processedSummaryData: null
});

const actionHandlers = {
  [PROCESS_SUMMARY_DATA]: (state, action) =>
    state.set('processedSummaryData', processReportResults(action.vmSummaryReportResult))
};

export default functionLookupReducer(initialState, actionHandlers);
