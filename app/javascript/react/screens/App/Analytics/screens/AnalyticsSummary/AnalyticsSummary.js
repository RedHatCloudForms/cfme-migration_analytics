import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'patternfly-react';
import { VM_SUMMARY_REPORT_FILTERS, FINISHED, OK } from '../../constants';

// TODO set up actions for running the report
// TODO figure out polling / waiting / loading results
// TODO dump the report data into the view as JSON
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
    fetchReportsAction(VM_SUMMARY_REPORT_FILTERS);
  }

  componentDidUpdate(prevProps) {
    const {
      vmSummaryReport,
      runReportAction,
      vmSummaryReportRun,
      fetchTaskAction,
      isFetchingVmSummaryReportTask,
      vmSummaryReportTask,
      fetchResultAction
    } = this.props;
    // Once we have a report ID, run it.
    if (!prevProps.vmSummaryReport && vmSummaryReport) {
      runReportAction(vmSummaryReport.href);
      return;
    }
    // Once we have a task ID, fetch it.
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
      fetchResultAction(vmSummaryReportRun.result_href);
    }
  }

  render() {
    const { vmSummaryReportResult } = this.props;
    if (!vmSummaryReportResult) {
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
        <pre>{JSON.stringify(vmSummaryReportResult, 2)}</pre>
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
  })
};

export default AnalyticsSummary;
