import Immutable from 'seamless-immutable';
import { FETCH_REPORTS, RUN_REPORT, FETCH_TASK, FETCH_RESULT } from './constants';

export const initialState = Immutable({
  numReportFetchesPending: 0,
  errorFetchingReports: null,
  reports: [],
  numReportRunsPending: 0,
  errorRunningReport: null,
  reportRuns: [], // TODO index this by id/href instead?
  fetchingTaskHrefs: [],
  errorFetchingTask: null,
  tasksById: {},
  fetchingResultHrefs: [],
  errorFetchingResult: null,
  resultsById: {}
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

    case `${FETCH_TASK}_PENDING`:
      return state
        .set('fetchingTaskHrefs', [...state.fetchingTaskHrefs, action.meta.href])
        .set('errorFetchingTask', null);
    case `${FETCH_TASK}_FULFILLED`:
      return state
        .set('fetchingTaskHrefs', state.fetchingTaskHrefs.filter(href => href !== action.meta.href))
        .set('errorFetchingTask', null)
        .set('tasksById', { ...state.tasksById, [action.payload.data.id]: action.payload.data });
    case `${FETCH_TASK}_REJECTED`:
      return state
        .set('fetchingTaskHrefs', state.fetchingTaskHrefs.filter(href => href !== action.meta.href))
        .set('errorFetchingTask', action.payload);

    case `${FETCH_RESULT}_PENDING`:
      return state
        .set('fetchingResultHrefs', [...state.fetchingResultHrefs, action.meta.href])
        .set('errorFetchingResult', null);
    case `${FETCH_RESULT}_FULFILLED`:
      return state
        .set('fetchingResultHrefs', state.fetchingResultHrefs.filter(href => href !== action.meta.href))
        .set('errorFetchingResult', null)
        .set('resultsById', { ...state.resultsById, [action.payload.data.id]: action.payload.data });
    case `${FETCH_RESULT}_REJECTED`:
      return state
        .set('fetchingResultHrefs', state.fetchingResultHrefs.filter(href => href !== action.meta.href))
        .set('errorFetchingResult', action.payload);

    default:
      return state;
  }
};
