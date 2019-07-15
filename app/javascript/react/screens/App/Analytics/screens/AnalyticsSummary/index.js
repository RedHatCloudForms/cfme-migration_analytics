import { connect } from 'react-redux';
import AnalyticsSummary from './AnalyticsSummary';
import { fetchProvidersAction } from '../../../../../../redux/providers/providersActions';
import {
  selectProvidersByFilterValues,
  selectProvidersAwaitingRefresh,
  selectProvidersWithRefreshErrors
} from '../../../../../../redux/providers/providersSelectors';
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
import { resetAllStateAction } from '../../../../../../redux/common/commonActions';
import { VM_SUMMARY_REPORT_FILTERS, ENV_SUMMARY_REPORT_FILTERS, VMWARE_PROVIDERS_FILTERS } from '../../constants';

const mapStateToProps = ({
  migrationAnalytics: {
    providers,
    reports,
    analytics: { summaryData }
  }
}) => {
  const vmSummaryReport = selectReportByFilterValues(reports, VM_SUMMARY_REPORT_FILTERS);
  const envSummaryReport = selectReportByFilterValues(reports, ENV_SUMMARY_REPORT_FILTERS);
  const vmSummaryReportRun = selectRunByReport(reports, vmSummaryReport);
  const envSummaryReportRun = selectRunByReport(reports, envSummaryReport);
  return {
    isFetchingProviders: providers.isFetchingProviders,
    errorFetchingProviders: providers.errorFetchingProviders,
    providers: selectProvidersByFilterValues(providers, VMWARE_PROVIDERS_FILTERS),
    providersAwaitingRefresh: selectProvidersAwaitingRefresh(providers),
    providersWithRefreshErrors: selectProvidersWithRefreshErrors(providers),
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
  {
    fetchProvidersAction,
    fetchReportsAction,
    runReportAction,
    fetchTaskAction,
    fetchResultAction,
    calculateSummaryDataAction,
    resetAllStateAction
  }
)(AnalyticsSummary);
