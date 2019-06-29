import URI from 'urijs';
import API from '../../common/API';
import { FETCH_REPORTS, REPORTS_URL, RUN_REPORT } from './constants';

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
