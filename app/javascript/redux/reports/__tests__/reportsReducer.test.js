import reportsReducer, { initialState } from '../reportsReducer';
import { RUN_REPORT, FETCH_TASK, FETCH_RESULT, FETCH_REPORTS } from '../constants';
import { RESET_ALL_STATE } from '../../common/constants';

describe('reports reducer', () => {
  test('constructs initial state correctly', () => {
    expect(initialState).toMatchSnapshot();
  });

  test('calls an action handler for runReport', () => {
    const state = reportsReducer(initialState, { type: `${RUN_REPORT}_PENDING`, meta: { href: 'foo' } });
    expect(state.runningReportHrefs).toEqual(['foo']);
  });

  test('calls an action handler for fetchTask', () => {
    const state = reportsReducer(initialState, { type: `${FETCH_TASK}_PENDING`, meta: { href: 'foo' } });
    expect(state.fetchingTaskHrefs).toEqual(['foo']);
  });

  test('calls an action handler for fetchResult', () => {
    const state = reportsReducer(initialState, { type: `${FETCH_RESULT}_PENDING`, meta: { href: 'foo' } });
    expect(state.fetchingResultHrefs).toEqual(['foo']);
  });

  test('keeps track of number of reports being fetched', () => {
    const prevState = initialState.set('errorFetchingReports', 'some error');
    const state = reportsReducer(prevState, { type: `${FETCH_REPORTS}_PENDING` });
    expect(state.numReportFetchesPending).toBe(1);
    expect(state.errorFetchingReports).toBe(null);
  });

  test('stores fetched reports', () => {
    const prevState = initialState
      .set('errorFetchingReports', 'some error')
      .set('numReportFetchesPending', 1)
      .set('reports', [{ id: 1, mock: 'report' }, { id: 2, mock: 'report' }]);
    const state = reportsReducer(prevState, {
      type: `${FETCH_REPORTS}_FULFILLED`,
      payload: { data: { resources: [{ id: 2, mock: 'report' }, { id: 3, mock: 'report' }] } }
    });
    expect(state.errorFetchingReports).toBe(null);
    expect(state.numReportFetchesPending).toBe(0);
    expect(state.reports).toEqual([{ id: 1, mock: 'report' }, { id: 2, mock: 'report' }, { id: 3, mock: 'report' }]);
  });

  test('stores error fetching report', () => {
    const prevState = initialState.set('numReportFetchesPending', 1);
    const state = reportsReducer(prevState, {
      type: `${FETCH_REPORTS}_REJECTED`,
      payload: { data: { error: 'some error' } }
    });
    expect(state.numReportFetchesPending).toBe(0);
    expect(state.errorFetchingReports).toEqual('some error');
  });

  test('resets all state', () => {
    const prevState = initialState
      .set('numReportFetchesPending', 3)
      .set('errorFetchingReports', 'some error')
      .set('reports', ['stuff', 'things'])
      .set('fetchingTaskHrefs', ['some', 'hrefs'])
      .set('errorFetchingResult', 'something')
      .set('resultsByHref', { etc: 'etc' });
    const state = reportsReducer(prevState, { type: RESET_ALL_STATE });
    expect(state).toEqual(initialState);
  });
});
