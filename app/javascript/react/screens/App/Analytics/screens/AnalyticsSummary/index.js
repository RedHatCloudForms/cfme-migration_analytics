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
import { VM_SUMMARY_REPORT_FILTERS, ENV_SUMMARY_REPORT_FILTERS } from '../../constants';

const mapStateToProps = ({
  migrationAnalytics: {
    reports,
    analytics: { summaryData }
  }
}) => {
  const vmSummaryReport = selectReportByFilterValues(reports, VM_SUMMARY_REPORT_FILTERS);
  const envSummaryReport = selectReportByFilterValues(reports, ENV_SUMMARY_REPORT_FILTERS);
  const vmSummaryReportRun = selectRunByReport(reports, vmSummaryReport);
  const envSummaryReportRun = selectRunByReport(reports, envSummaryReport);
  return {
    vmSummaryReport,
    envSummaryReport,
    vmSummaryReportRun,
    envSummaryReportRun,
    isFetchingVmSummaryReportTask: selectIsFetchingTaskByRun(reports, vmSummaryReportRun),
    isFetchingEnvSummaryReportTask: selectIsFetchingTaskByRun(reports, envSummaryReportRun),
    vmSummaryReportTask: selectTaskByRun(reports, vmSummaryReportRun),
    envSummaryReportTask: selectTaskByRun(reports, envSummaryReportRun),
    vmSummaryReportResult: selectResultByRun(reports, vmSummaryReportRun),
    envSummaryReportResult: selectResultByRun(reports, envSummaryReportRun),
    summaryData
  };
};

export default connect(
  mapStateToProps,
  { fetchReportsAction, runReportAction, fetchTaskAction, fetchResultAction, calculateSummaryDataAction }
)(AnalyticsSummary);
