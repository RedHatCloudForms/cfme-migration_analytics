import URI from 'urijs';
import API from '../../common/API';
import { FETCH_REPORTS, REPORTS_URL, RUN_REPORT, FETCH_TASK, FETCH_RESULT } from './constants';

export const fetchReportsAction = filterValues => dispatch => {
  const uri = new URI(REPORTS_URL);
  const apiFilters = Object.keys(filterValues).map(key => `${key}='${filterValues[key]}'`);
  uri.addSearch('filter[]', apiFilters);
  uri.addSearch('expand', 'resources');
  uri.addSearch('attributes', 'href,name,rpt_group');
  return dispatch({
    type: FETCH_REPORTS,
    payload: API.get(uri.toString())
  });
};

export const runReportAction = reportHref => dispatch =>
  dispatch({
    type: RUN_REPORT,
    payload: API.post(new URI(reportHref).toString(), { action: 'run' })
  });

const basicFetchAction = (type, href) => dispatch =>
  dispatch({
    type,
    payload: API.get(new URI(href).toString()),
    meta: { href }
  });

export const fetchTaskAction = taskHref => basicFetchAction(FETCH_TASK, taskHref);

export const fetchResultAction = resultHref => basicFetchAction(FETCH_RESULT, resultHref);
