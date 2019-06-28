import Immutable from 'seamless-immutable';
import { FETCH_REPORTS } from './constants';

export const initialState = Immutable({
  numReportFetchesPending: 0,
  errorFetchingReports: null,
  reports: []
});

export default (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
