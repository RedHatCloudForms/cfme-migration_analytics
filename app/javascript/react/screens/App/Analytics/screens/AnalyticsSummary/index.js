import { connect } from 'react-redux';
import AnalyticsSummary from './AnalyticsSummary';
import {
  fetchReportsAction,
  runReportAction,
  fetchTaskAction,
  fetchResultAction
} from '../../../../../../redux/reports/reportsActions';
import {
  selectReportByFilterValues,
  selectRunByReport,
  selectTaskByRun,
  selectIsFetchingTaskByRun,
  selectResultByRun
} from '../../../../../../redux/reports/reportsSelectors';
import { calculateSummaryDataAction } from '../../redux/analyticsActions';
import { VM_SUMMARY_REPORT_FILTERS } from '../../constants';

const mapStateToProps = ({
  migrationAnalytics: {
    reports,
    analytics: { summaryData }
  }
}) => {
  const vmSummaryReport = selectReportByFilterValues(reports, VM_SUMMARY_REPORT_FILTERS);
  const vmSummaryReportRun = selectRunByReport(reports, vmSummaryReport);
  return {
    vmSummaryReport,
    vmSummaryReportRun,
    isFetchingVmSummaryReportTask: selectIsFetchingTaskByRun(reports, vmSummaryReportRun),
    vmSummaryReportTask: selectTaskByRun(reports, vmSummaryReportRun),
    vmSummaryReportResult: selectResultByRun(reports, vmSummaryReportRun),
    summaryData
  };
};

export default connect(
  mapStateToProps,
  { fetchReportsAction, runReportAction, fetchTaskAction, fetchResultAction, calculateSummaryDataAction }
)(AnalyticsSummary);
