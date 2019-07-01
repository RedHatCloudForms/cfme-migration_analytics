import { CALCULATE_SUMMARY_DATA } from './constants';

export const calculateSummaryDataAction = vmSummaryReportResult => dispatch =>
  dispatch({
    type: CALCULATE_SUMMARY_DATA,
    vmSummaryReportResult
  });
