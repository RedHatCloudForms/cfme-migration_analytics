import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';
import {
  VM_SUMMARY_REPORT_FILTERS,
  ENV_SUMMARY_REPORT_FILTERS,
  FINISHED,
  OK,
  ERROR,
  VMWARE_PROVIDERS_FILTERS,
  PROVIDER_REFRESH_ATTRIBUTES
} from '../../constants';
import SummaryAccordion, { summaryDataShape } from './components/SummaryAccordion';
import { someProvidersExist, noRefreshErrorsExist, someProvidersAwaitingRefresh, providersRefreshed } from './helpers';
import LargeInlineSpinner from './components/LargeInlineSpinner';
import EmptyStateWithButton from './components/EmptyStateWithButton';
import ProviderRefreshErrors from './components/ProviderRefreshErrors';
import ReportTaskError from './components/ReportTaskError';

class AnalyticsSummary extends React.Component {
  constructor(props) {
    super(props);
    this.fetchProvidersTimeout = null;
    this.fetchTaskTimeouts = {};
  }

  componentDidMount() {
    const { providers, vmSummaryReport, envSummaryReport } = this.props;
    if (!providers || !vmSummaryReport || !envSummaryReport) {
      // Kick off the chain of action calls in componentDidUpdate
      this.doInitialFetch();
    }
  }

  componentDidUpdate(prevProps) {
    const { vmSummaryReportResult, envSummaryReportResult, calculateSummaryDataAction } = this.props;

    // Make sure providers are refreshed before we run reports.
    const { providersWereReady, providersAreReady } = this.handleUpdateForProviders(prevProps);

    // Handle the lifecycle of running the VM Summary report.
    this.handleUpdateForReport({
      providersWereReady,
      providersAreReady,
      prevReport: prevProps.vmSummaryReport,
      report: this.props.vmSummaryReport,
      prevReportRun: prevProps.vmSummaryReportRun,
      reportRun: this.props.vmSummaryReportRun,
      wasFetchingTask: prevProps.isFetchingVmSummaryReportTask,
      isFetchingTask: this.props.isFetchingVmSummaryReportTask,
      prevTask: prevProps.vmSummaryReportTask,
      task: this.props.vmSummaryReportTask
    });

    // Handle the lifecycle of running the Environment Summary report.
    this.handleUpdateForReport({
      providersWereReady,
      providersAreReady,
      prevReport: prevProps.envSummaryReport,
      report: this.props.envSummaryReport,
      prevReportRun: prevProps.envSummaryReportRun,
      reportRun: this.props.envSummaryReportRun,
      wasFetchingTask: prevProps.isFetchingEnvSummaryReportTask,
      isFetchingTask: this.props.isFetchingEnvSummaryReportTask,
      prevTask: prevProps.envSummaryReportTask,
      task: this.props.envSummaryReportTask
    });

    // Once we have all report results, process them for rendering.
    const hadAllResults = prevProps.vmSummaryReportResult && prevProps.envSummaryReportResult;
    const haveAllResults = vmSummaryReportResult && envSummaryReportResult;
    if (!hadAllResults && haveAllResults) {
      calculateSummaryDataAction({ vmSummaryReportResult, envSummaryReportResult });
    }
  }

  fetchProviders = () => this.props.fetchProvidersAction(VMWARE_PROVIDERS_FILTERS, PROVIDER_REFRESH_ATTRIBUTES);

  doInitialFetch = () => {
    const { fetchReportsAction } = this.props;
    this.fetchProviders();
    fetchReportsAction(VM_SUMMARY_REPORT_FILTERS);
    fetchReportsAction(ENV_SUMMARY_REPORT_FILTERS);
  };

  retry = () => {
    this.props.resetAllStateAction();
    this.doInitialFetch();
  };

  handleUpdateForProviders = prevProps => {
    const { isFetchingProviders } = this.props;

    // If we fetched providers, and there are no refresh errors, and some are awaiting refresh, wait and fetch again.
    if (
      prevProps.isFetchingProviders &&
      !isFetchingProviders &&
      someProvidersExist(this.props) &&
      noRefreshErrorsExist(this.props) &&
      someProvidersAwaitingRefresh(this.props)
    ) {
      this.fetchProvidersTimeout = setTimeout(this.fetchProviders, 3000);
    }

    const providersWereReady = providersRefreshed(prevProps);
    const providersAreReady = providersRefreshed(this.props);

    if (!providersWereReady && providersAreReady) {
      clearTimeout(this.fetchProvidersTimeout); // Just in case.
      this.fetchProvidersTimeout = null;
    }

    return { providersWereReady, providersAreReady };
  };

  handleUpdateForReport = ({
    providersWereReady,
    providersAreReady,
    prevReport,
    report,
    prevReportRun,
    reportRun,
    wasFetchingTask,
    isFetchingTask,
    prevTask,
    task
  }) => {
    const { runReportAction, fetchTaskAction, fetchResultAction } = this.props;

    const wasReadyToRunReport = providersWereReady && prevReport;
    const isReadyToRunReport = providersAreReady && report;

    // Once providers are ready and we've found the report href, run it.
    if (!wasReadyToRunReport && isReadyToRunReport) runReportAction(report.href);

    // Once we have a task href for the running report, fetch it.
    if (!prevReportRun && reportRun) fetchTaskAction(reportRun.task_href);

    // If we fetched an unfinished task, wait and fetch it again.
    if (wasFetchingTask && !isFetchingTask && task && task.state !== FINISHED) {
      this.fetchTaskTimeouts[reportRun.task_href] = setTimeout(() => fetchTaskAction(reportRun.task_href), 1000);
    }

    // Once we have a successfully finished task, fetch its result.
    if ((!prevTask || prevTask.state !== FINISHED) && task && task.state === FINISHED && task.status === OK) {
      clearTimeout(this.fetchTaskTimeouts[reportRun.task_href]); // Just in case.
      this.fetchTaskTimeouts[reportRun.task_href] = null;
      fetchResultAction(reportRun.result_href);
    }
  };

  render() {
    const {
      isFetchingProviders,
      errorFetchingProviders,
      providers,
      providersWithRefreshErrors,
      errorFetchingReports,
      vmSummaryReportTask,
      envSummaryReportTask,
      providersAwaitingRefresh,
      summaryData,
      onCollectInventoryClick
    } = this.props;

    if (errorFetchingProviders) {
      return (
        <EmptyStateWithButton
          iconName="error-circle-o"
          title={__('Failed to fetch providers')}
          message={errorFetchingProviders.message}
          buttonText={__('Try again')}
          onClick={this.fetchProviders}
        />
      );
    }

    if (providers && providers.length === 0) {
      return (
        <EmptyStateWithButton
          title={__('Missing Providers')}
          message={__('Before collecting analytics data, you must have at least one VMware provider configured.')}
          buttonText={__('Configure Infrastructure Providers')}
          href="/ems_infra/show_list"
        />
      );
    }

    if (providersWithRefreshErrors && providersWithRefreshErrors.length > 0) {
      return (
        <ProviderRefreshErrors providersWithRefreshErrors={providersWithRefreshErrors} onRetryClick={this.retry} />
      );
    }

    if (errorFetchingReports) {
      return (
        <EmptyStateWithButton
          iconName="error-circle-o"
          title={__('Failed to fetch reports')}
          message={errorFetchingReports.message}
          buttonText={__('Try again')}
          onClick={this.retry}
        />
      );
    }

    const taskWithError = [vmSummaryReportTask, envSummaryReportTask].find(task => task && task.status === ERROR);
    if (taskWithError) {
      return <ReportTaskError taskWithError={taskWithError} onRetryClick={this.retry} />;
    }

    if (providersAwaitingRefresh && providersAwaitingRefresh.length > 0) {
      return <LargeInlineSpinner message={__('Waiting for provider refresh')} />;
    }

    if (isFetchingProviders) {
      return <LargeInlineSpinner message={__('Checking providers')} />;
    }

    if (!summaryData) {
      return <LargeInlineSpinner message={__('Examining virtualization providers')} />;
    }

    return (
      <React.Fragment>
        <SummaryAccordion summaryData={summaryData} />
        <Button bsStyle="primary" onClick={onCollectInventoryClick}>
          {__('Collect Inventory Data')}
        </Button>
      </React.Fragment>
    );
  }
}

const errorShape = PropTypes.shape({
  message: PropTypes.string
});
const providerShape = PropTypes.shape({
  href: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  last_refresh_error: PropTypes.string,
  last_refresh_date: PropTypes.string
});
const reportShape = PropTypes.shape({
  href: PropTypes.string,
  name: PropTypes.string,
  rpt_group: PropTypes.string
});
const reportRunShape = PropTypes.shape({
  href: PropTypes.string,
  result_href: PropTypes.string,
  task_href: PropTypes.string
});
const reportTaskShape = PropTypes.shape({
  id: PropTypes.string,
  state: PropTypes.string,
  status: PropTypes.string
});

AnalyticsSummary.propTypes = {
  fetchProvidersAction: PropTypes.func.isRequired,
  isFetchingProviders: PropTypes.bool,
  errorFetchingProviders: errorShape,
  providers: PropTypes.arrayOf(providerShape),
  providersAwaitingRefresh: PropTypes.arrayOf(providerShape),
  providersWithRefreshErrors: PropTypes.arrayOf(providerShape),
  fetchReportsAction: PropTypes.func.isRequired,
  errorFetchingReports: errorShape,
  vmSummaryReport: reportShape,
  envSummaryReport: reportShape,
  runReportAction: PropTypes.func.isRequired,
  vmSummaryReportRun: reportRunShape,
  envSummaryReportRun: reportRunShape,
  fetchTaskAction: PropTypes.func.isRequired,
  isFetchingVmSummaryReportTask: PropTypes.bool,
  isFetchingEnvSummaryReportTask: PropTypes.bool,
  vmSummaryReportTask: reportTaskShape,
  envSummaryReportTask: reportTaskShape,
  fetchResultAction: PropTypes.func.isRequired,
  vmSummaryReportResult: PropTypes.shape({
    result_set: PropTypes.arrayOf(
      PropTypes.shape({
        allocated_disk_storage: PropTypes.number,
        mem_cpu: PropTypes.number,
        cpu_total_cores: PropTypes.number,
        'ext_management_system.name': PropTypes.string,
        'ext_management_system.id': PropTypes.number
      })
    )
  }),
  envSummaryReportResult: PropTypes.shape({
    result_set: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        num_cpu: PropTypes.number,
        v_total_vms: PropTypes.number,
        'ext_management_system.name': PropTypes.string,
        'ext_management_system.id': PropTypes.number
      })
    )
  }),
  calculateSummaryDataAction: PropTypes.func.isRequired,
  summaryData: summaryDataShape,
  onCollectInventoryClick: PropTypes.func.isRequired,
  resetAllStateAction: PropTypes.func.isRequired
};

AnalyticsSummary.defaultProps = {
  isFetchingProviders: false,
  errorFetchingProviders: null,
  providers: null,
  providersAwaitingRefresh: null,
  providersWithRefreshErrors: null,
  errorFetchingReports: null,
  vmSummaryReport: null,
  envSummaryReport: null,
  vmSummaryReportRun: null,
  envSummaryReportRun: null,
  isFetchingVmSummaryReportTask: false,
  isFetchingEnvSummaryReportTask: false,
  vmSummaryReportTask: null,
  envSummaryReportTask: null,
  vmSummaryReportResult: null,
  envSummaryReportResult: null,
  summaryData: null
};

export default AnalyticsSummary;
