import Immutable from 'seamless-immutable';
import { FETCH_REPORTS, RUN_REPORT } from './constants';

export const initialState = Immutable({
  numReportFetchesPending: 0,
  errorFetchingReports: null,
  reports: [],
  numReportRunsPending: 0,
  errorRunningReport: null,
  reportRuns: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    // TODO reset to initial state when the main analytics page mounts? otherwise will we get `reports` building up?
    case `${FETCH_REPORTS}_PENDING`:
      return state.set('numReportFetchesPending', state.numReportFetchesPending + 1).set('errorFetchingReports', null);
    case `${FETCH_REPORTS}_FULFILLED`:
      return state
        .set('numReportFetchesPending', state.numReportFetchesPending - 1)
        .set('errorFetchingReports', null)
        .set('reports', [...state.reports, ...action.payload.data.resources]);
    case `${FETCH_REPORTS}_REJECTED`:
      return state
        .set('numReportFetchesPending', state.numReportFetchesPending - 1)
        .set('errorFetchingReports', action.payload);

    case `${RUN_REPORT}_PENDING`:
      return state.set('numReportRunsPending', state.numReportRunsPending + 1).set('errorRunningReport', null);
    case `${RUN_REPORT}_FULFILLED`:
      return state
        .set('numReportRunsPending', state.numReportRunsPending - 1)
        .set('errorRunningReport', null)
        .set('reportRuns', [
          ...state.reportRuns.filter(run => run.href !== action.payload.data.href),
          action.payload.data
        ]);
    case `${RUN_REPORT}_REJECTED`:
      return state
        .set('numReportRunsPending', state.numReportRunsPending - 1)
        .set('errorRunningReport', action.payload);

    default:
      return state;
  }
};
