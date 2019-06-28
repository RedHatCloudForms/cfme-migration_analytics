import URI from 'urijs';
import API from '../../common/API';
import { FETCH_REPORTS, REPORTS_URL } from './constants';

export const fetchReportsAction = filterAttributes => dispatch => {
  const uri = new URI(REPORTS_URL);
  const apiFilters = Object.keys(filterAttributes).map(key => `${key}='${filterAttributes[key]}'`);
  uri.addSearch('filter[]', apiFilters);
  return dispatch({
    type: FETCH_REPORTS,
    payload: API.get(uri.toString())
  });
};
