import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'patternfly-react';
import { VM_SUMMARY_REPORT_FILTERS, FINISHED, OK } from '../../constants';

// TODO sort out data we need from the mocks and write helpers to calculate it
// TODO build accordion showing summary data
// TODO provider selection?
// TODO next page?

class AnalyticsSummary extends React.Component {
  constructor(props) {
    super(props);
    this.taskFetchTimeout = null;
  }

  componentDidMount() {
    const { fetchReportsAction } = this.props;
    fetchReportsAction(VM_SUMMARY_REPORT_FILTERS); // Kicks off the chain of action calls in componentDidUpdate
  }

  componentDidUpdate(prevProps) {
    const {
      vmSummaryReport,
      runReportAction,
      vmSummaryReportRun,
      fetchTaskAction,
      isFetchingVmSummaryReportTask,
      vmSummaryReportTask,
      fetchResultAction,
      vmSummaryReportResult,
      calculateSummaryDataAction
    } = this.props;

    // Once we've found the report href, run it.
    if (!prevProps.vmSummaryReport && vmSummaryReport) {
      runReportAction(vmSummaryReport.href);
      return;
    }

    // Once we have a task href for the running report, fetch it.
    if (!prevProps.vmSummaryReportRun && vmSummaryReportRun) {
      fetchTaskAction(vmSummaryReportRun.task_href);
      return;
    }

    // If we fetched an unfinished task, wait and fetch it again.
    if (
      prevProps.isFetchingVmSummaryReportTask &&
      !isFetchingVmSummaryReportTask &&
      vmSummaryReportTask &&
      vmSummaryReportTask.state !== FINISHED
    ) {
      this.taskFetchTimeout = setTimeout(() => fetchTaskAction(vmSummaryReportRun.task_href), 1000);
      return;
    }

    // Once we have a successfully finished task, fetch its result.
    if (
      (!prevProps.vmSummaryReportTask || prevProps.vmSummaryReportTask.state !== FINISHED) &&
      vmSummaryReportTask &&
      vmSummaryReportTask.state === FINISHED &&
      vmSummaryReportTask.status === OK
    ) {
      clearTimeout(this.fetchTaskTimeout); // Just in case.
      fetchResultAction(vmSummaryReportRun.result_href);
      return;
    }

    // Once we have a report result, process it for rendering.
    if (!prevProps.vmSummaryReportResult && vmSummaryReportResult) {
      calculateSummaryDataAction(vmSummaryReportResult);
    }
  }

  render() {
    const { summaryData } = this.props;
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
        <h1>TODO</h1>
        <pre>{JSON.stringify(summaryData, 2)}</pre>
      </React.Fragment>
    );
  }
}

AnalyticsSummary.propTypes = {
  fetchReportsAction: PropTypes.func,
  vmSummaryReport: PropTypes.shape({
    href: PropTypes.string,
    name: PropTypes.string,
    rpt_group: PropTypes.string
  }),
  runReportAction: PropTypes.func,
  vmSummaryReportRun: PropTypes.shape({
    href: PropTypes.string,
    result_href: PropTypes.string,
    task_href: PropTypes.string
  }),
  fetchTaskAction: PropTypes.func,
  isFetchingVmSummaryReportTask: PropTypes.bool,
  vmSummaryReportTask: PropTypes.shape({
    id: PropTypes.string,
    state: PropTypes.string,
    status: PropTypes.string
  }),
  fetchResultAction: PropTypes.func,
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
  calculateSummaryDataAction: PropTypes.func,
  summaryData: PropTypes.shape({
    total: PropTypes.shape({
      numProviders: PropTypes.number,
      numHypervisors: PropTypes.number,
      numVms: PropTypes.number,
      allocatedDiskSpace: PropTypes.number,
      allocatedMemory: PropTypes.number,
      numCpuCores: PropTypes.number
    }),
    providers: PropTypes.arrayOf(
      PropTypes.shape({
        numHypervisors: PropTypes.number,
        numVms: PropTypes.number,
        allocatedDiskSpace: PropTypes.number,
        allocatedMemory: PropTypes.number,
        numCpuCores: PropTypes.number
      })
    )
  })
};

export default AnalyticsSummary;
