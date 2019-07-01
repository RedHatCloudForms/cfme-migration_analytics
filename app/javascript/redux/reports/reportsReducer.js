import Immutable from 'seamless-immutable';
import { functionLookupReducer, getHandlersForFetchActionsIndexedByHref } from '../helpers';
import { FETCH_REPORTS, RUN_REPORT, FETCH_TASK, FETCH_RESULT } from './constants';
import { concatPreservingUniqueIds } from './helpers';

const runReport = getHandlersForFetchActionsIndexedByHref(
  RUN_REPORT,
  'runningReportHrefs',
  'errorRunningReport',
  'reportRunsByHref'
);
const fetchTask = getHandlersForFetchActionsIndexedByHref(
  FETCH_TASK,
  'fetchingTaskHrefs',
  'errorFetchingTask',
  'tasksByHref'
);
const fetchResult = getHandlersForFetchActionsIndexedByHref(
  FETCH_RESULT,
  'fetchingResultHrefs',
  'errorFetchingResult',
  'resultsByHref'
);

export const initialState = Immutable({
  numReportFetchesPending: 0,
  errorFetchingReports: null,
  reports: [],
  ...runReport.initialState,
  ...fetchTask.initialState,
  ...fetchResult.initialState
});

const actionHandlers = {
  [`${FETCH_REPORTS}_PENDING`]: state =>
    state.set('numReportFetchesPending', state.numReportFetchesPending + 1).set('errorFetchingReports', null),
  [`${FETCH_REPORTS}_FULFILLED`]: (state, action) =>
    state
      .set('errorFetchingReports', null)
      .set('numReportFetchesPending', state.numReportFetchesPending - 1)
      .set('reports', concatPreservingUniqueIds(state.reports, action.payload.data.resources)),
  [`${FETCH_REPORTS}_REJECTED`]: (state, action) =>
    state.set('numReportFetchesPending', state.numReportFetchesPending - 1).set('errorFetchingReports', action.payload),
  ...runReport.actionHandlers,
  ...fetchTask.actionHandlers,
  ...fetchResult.actionHandlers
};

export default functionLookupReducer(initialState, actionHandlers);
