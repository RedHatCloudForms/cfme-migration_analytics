import URI from 'urijs';
import API from '../../common/API';
import { FETCH_REPORTS, REPORTS_URL, RUN_REPORT, FETCH_TASK, FETCH_RESULT } from './constants';
import { fetchExpandedResourcesAction } from '../helpers';

export const fetchReportsAction = filterValues =>
  fetchExpandedResourcesAction(FETCH_REPORTS, REPORTS_URL, filterValues, ['href', 'name', 'rpt_group']);

export const runReportAction = reportHref => dispatch =>
  dispatch({
    type: RUN_REPORT,
    payload: API.post(new URI(reportHref).toString(), { action: 'run' }),
    meta: { href: reportHref }
  });

const basicFetchAction = (type, href) => dispatch =>
  dispatch({
    type,
    payload: API.get(new URI(href).toString()),
    meta: { href }
  });

export const fetchTaskAction = taskHref => basicFetchAction(FETCH_TASK, taskHref);

export const fetchResultAction = resultHref => basicFetchAction(FETCH_RESULT, resultHref);
