import { PROCESS_SUMMARY_DATA } from './constants';

export const processReportResultsAction = vmSummaryReportResult => dispatch =>
  dispatch({
    type: PROCESS_SUMMARY_DATA,
    vmSummaryReportResult
  });
