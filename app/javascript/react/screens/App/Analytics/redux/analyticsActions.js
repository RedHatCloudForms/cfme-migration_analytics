import { CALCULATE_SUMMARY_DATA } from './constants';

export const calculateSummaryDataAction = results => dispatch =>
  dispatch({
    type: CALCULATE_SUMMARY_DATA,
    results
  });
