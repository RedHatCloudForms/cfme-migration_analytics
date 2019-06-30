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
  selectIsFetchingTaskByRun
} from '../../../../../../redux/reports/reportsSelectors';
import { VM_SUMMARY_REPORT_FILTERS } from '../../constants';

const mapStateToProps = ({ migrationAnalytics: { reports } }) => {
  const vmSummaryReport = selectReportByFilterValues(reports, VM_SUMMARY_REPORT_FILTERS);
  const vmSummaryReportRun = selectRunByReport(reports, vmSummaryReport);
  return {
    vmSummaryReport,
    vmSummaryReportRun,
    isFetchingVmSummaryReportTask: selectIsFetchingTaskByRun(reports, vmSummaryReportRun),
    vmSummaryReportTask: selectTaskByRun(reports, vmSummaryReportRun)
  };
};

export default connect(
  mapStateToProps,
  { fetchReportsAction, runReportAction, fetchTaskAction, fetchResultAction }
)(AnalyticsSummary);
