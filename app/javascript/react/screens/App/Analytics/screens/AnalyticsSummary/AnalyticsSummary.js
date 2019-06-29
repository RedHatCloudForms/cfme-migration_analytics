import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'patternfly-react';
import { PROVIDERS_SUMMARY_REPORT_FILTERS } from '../../constants';

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
    fetchReportsAction(PROVIDERS_SUMMARY_REPORT_FILTERS);
  }

  componentDidUpdate(prevProps) {
    const { providersSummaryReport, runReportAction, lastProvidersSummaryReportRun } = this.props;
    if (!prevProps.providersSummaryReport && providersSummaryReport) {
      runReportAction(providersSummaryReport.href);
    }
    if (!prevProps.lastProvidersSummaryReportRun && lastProvidersSummaryReportRun) {
      console.log('TODO, start polling based on run: ', lastProvidersSummaryReportRun); // TODO
    }
  }

  render() {
    const { providersSummaryReport } = this.props;
    if (!providersSummaryReport) {
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
        <pre>{JSON.stringify(providersSummaryReport, 2)}</pre>
      </React.Fragment>
    );
  }
}

AnalyticsSummary.propTypes = {
  fetchReportsAction: PropTypes.func,
  providersSummaryReport: PropTypes.shape({
    href: PropTypes.string,
    name: PropTypes.string,
    rpt_group: PropTypes.string
  }),
  runReportAction: PropTypes.func,
  lastProvidersSummaryReportRun: PropTypes.shape({
    href: PropTypes.string,
    result_href: PropTypes.string,
    task_href: PropTypes.string
  })
};

export default AnalyticsSummary;
