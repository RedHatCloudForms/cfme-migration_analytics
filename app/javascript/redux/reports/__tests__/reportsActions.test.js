import { fetchReportsAction, runReportAction, fetchTaskAction, fetchResultAction } from '../reportsActions';
import * as helpers from '../../helpers';
import { FETCH_REPORTS, REPORTS_URL, RUN_REPORT, FETCH_TASK, FETCH_RESULT } from '../constants';
import { mockStore } from '../../../common/testReduxHelpers';
import { mockRequest, mockReset } from '../../../common/mockRequests';

const store = mockStore();

afterEach(() => {
  store.clearActions();
  mockReset();
});

describe('reports actions', () => {
  test('fetch reports action', () => {
    const fetchExpandedResourcesAction = jest.spyOn(helpers, 'fetchExpandedResourcesAction');
    fetchReportsAction({ type: 'foo' });
    expect(fetchExpandedResourcesAction).toHaveBeenCalledWith(FETCH_REPORTS, REPORTS_URL, { type: 'foo' }, [
      'href',
      'name',
      'rpt_group'
    ]);
  });

  describe('run report action', () => {
    const href = '/mock/report/href';

    test('is successful', () => {
      mockRequest({
        method: 'POST',
        url: href,
        status: 200,
        response: 'mock report run payload'
      });
      global.API.post.mockClear();
      return store.dispatch(runReportAction(href)).then(() => {
        expect(global.API.post.mock.calls[0][0]).toEqual(href);
        expect(global.API.post.mock.calls[0][1]).toEqual({ action: 'run' });
        expect(store.getActions()).toEqual([
          { type: `${RUN_REPORT}_PENDING`, meta: { href } },
          { type: `${RUN_REPORT}_FULFILLED`, meta: { href }, payload: 'mock report run payload' }
        ]);
      });
    });

    test('is rejected', () => {
      mockRequest({
        method: 'POST',
        url: href,
        status: 404
      });
      return store.dispatch(runReportAction(href)).catch(() => {
        expect(store.getActions()).toEqual([
          { type: `${RUN_REPORT}_PENDING`, meta: { href } },
          { type: `${RUN_REPORT}_REJECTED`, meta: { href }, error: true, payload: new Error('<mocked error>') }
        ]);
      });
    });
  });

  const testBasicFetchAction = (actionCreator, type, href) => {
    test('is successful', () => {
      mockRequest({
        method: 'GET',
        url: href,
        status: 200,
        response: 'mock payload'
      });
      return store.dispatch(actionCreator(href)).then(() => {
        expect(store.getActions()).toEqual([
          { type: `${type}_PENDING`, meta: { href } },
          { type: `${type}_FULFILLED`, meta: { href }, payload: 'mock payload' }
        ]);
      });
    });

    test('is rejected', () => {
      mockRequest({
        method: 'GET',
        url: href,
        status: 404
      });
      return store.dispatch(actionCreator(href)).catch(() => {
        expect(store.getActions()).toEqual([
          { type: `${type}_PENDING`, meta: { href } },
          { type: `${type}_REJECTED`, meta: { href }, error: true, payload: new Error('<mocked error>') }
        ]);
      });
    });
  };

  describe('fetch task action', () => testBasicFetchAction(fetchTaskAction, FETCH_TASK, '/mock/task/href'));

  describe('fetch result action', () => testBasicFetchAction(fetchResultAction, FETCH_RESULT, '/mock/result/href'));
});
