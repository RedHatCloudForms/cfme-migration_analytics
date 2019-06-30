import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'patternfly-react';
import { VM_SUMMARY_REPORT_FILTERS, FINISHED } from '../../constants';

// TODO set up actions for running the report
// TODO figure out polling / waiting / loading results
// TODO dump the report data into the view as JSON
// TODO sort out data we need from the mocks and write helpers to calculate it
// TODO build accordion showing summary data
// TODO provider selection?
// TODO next page?

class AnalyticsSummary extends React.Component {
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
      vmSummaryReportTask
    } = this.props;
    if (!prevProps.vmSummaryReport && vmSummaryReport) {
      // Once we have a report ID, run it.
      runReportAction(vmSummaryReport.href);
      return;
    }
    if (!prevProps.vmSummaryReportRun && vmSummaryReportRun) {
      // Once we have a task ID, fetch it.
      fetchTaskAction(vmSummaryReportRun.task_href);
      return;
    }
    if (
      prevProps.isFetchingVmSummaryReportTask &&
      !isFetchingVmSummaryReportTask &&
      vmSummaryReportTask &&
      vmSummaryReportTask.state !== FINISHED
    ) {
      // Once we've fetched the task, if it's not finished, wait and fetch it again.
      setTimeout(() => fetchTaskAction(vmSummaryReportRun.task_href), 3000);
    }
    // TODO: fetch the result
  }

  render() {
    const { vmSummaryReport } = this.props;
    if (!vmSummaryReport) {
      return (
        <div className="large-spinner">
          <Spinner loading size="lg" inline />
          <h3>{__('Examining virtualization providers')}</h3>
        </div>
      );
    }

    return (
      <React.Fragment>
        <h1>TODO</h1>
        <pre>{JSON.stringify(vmSummaryReport, 2)}</pre>
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
  })
};

export default AnalyticsSummary;
