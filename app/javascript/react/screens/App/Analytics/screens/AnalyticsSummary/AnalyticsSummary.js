import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Button } from 'patternfly-react';
import {
  VM_SUMMARY_REPORT_FILTERS,
  ENV_SUMMARY_REPORT_FILTERS,
  FINISHED,
  OK,
  VMWARE_PROVIDERS_FILTERS,
  PROVIDER_REFRESH_ATTRIBUTES
} from '../../constants';
import SummaryAccordion, { summaryDataShape } from './components/SummaryAccordion';

// TODO provider selection?
// TODO next page?

class AnalyticsSummary extends React.Component {
  constructor(props) {
    super(props);
    this.fetchTaskTimeouts = {};
  }

  componentDidMount() {
    const { fetchProvidersAction, fetchReportsAction } = this.props;
    // Kick off the chain of action calls in componentDidUpdate
    fetchProvidersAction(VMWARE_PROVIDERS_FILTERS, PROVIDER_REFRESH_ATTRIBUTES);
    fetchReportsAction(VM_SUMMARY_REPORT_FILTERS);
    fetchReportsAction(ENV_SUMMARY_REPORT_FILTERS);
  }

  componentDidUpdate(prevProps) {
    const { vmSummaryReportResult, envSummaryReportResult, calculateSummaryDataAction } = this.props;

    // TODO poll for providers until no providersAwaitingRefresh remain, and then proceed to the other handlers below
    console.log('isFetchingProviders', this.props.isFetchingProviders);
    console.log('providersAwaitingRefresh', this.props.providersAwaitingRefresh);

    this.handleUpdateForReport({
      prevReport: prevProps.vmSummaryReport,
      report: this.props.vmSummaryReport,
      prevReportRun: prevProps.vmSummaryReportRun,
      reportRun: this.props.vmSummaryReportRun,
      wasFetchingTask: prevProps.isFetchingVmSummaryReportTask,
      isFetchingTask: this.props.isFetchingVmSummaryReportTask,
      prevTask: prevProps.vmSummaryReportTask,
      task: this.props.vmSummaryReportTask
    });

    this.handleUpdateForReport({
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

  handleUpdateForReport = ({
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

    // Once we've found the report href, run it.
    if (!prevReport && report) runReportAction(report.href);

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
    const { summaryData, onCollectInventoryClick } = this.props;
    if (!summaryData) {
      return (
        <div className="large-spinner">
          <Spinner loading size="lg" inline />
          <h3>{__('Examining virtualization providers')}</h3>
        </div>
      );
    }

    // TODO handle case where vmSummaryReportTask has an error

    return (
      <React.Fragment>
        <SummaryAccordion summaryData={summaryData} />
        <Button onClick={onCollectInventoryClick}>{__('Collect Inventory Data')}</Button>
      </React.Fragment>
    );
  }
}

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
  providersAwaitingRefresh: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      id: PropTypes.string,
      type: PropTypes.string,
      name: PropTypes.string,
      last_refresh_error: PropTypes.string,
      last_refresh_date: PropTypes.string
    })
  ),
  fetchReportsAction: PropTypes.func.isRequired,
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
  onCollectInventoryClick: PropTypes.func.isRequired
};

AnalyticsSummary.defaultProps = {
  isFetchingProviders: false,
  providersAwaitingRefresh: null,
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
