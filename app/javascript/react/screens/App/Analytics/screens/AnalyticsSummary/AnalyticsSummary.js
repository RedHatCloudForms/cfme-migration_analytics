import React from 'react';
import PropTypes from 'prop-types';

// TODO get a loading state set up
// TODO find the report via the same filter criteria
// TODO set up actions for running the report
// TODO figure out polling / waiting / loading results
// TODO dump the report data into the view as JSON
// TODO sort out data we need from the mocks and write helpers to calculate it
// TODO build accordion showing summary data
// TODO provider selection?
// TODO next page?

class AnalyticsSummary extends React.Component {
  componentDidMount() {
    // TODO
  }

  render() {
    return <h2>TODO</h2>;
  }
}

AnalyticsSummary.propTypes = {
  providersSummaryReport: PropTypes.shape({
    href: PropTypes.string,
    name: PropTypes.string,
    rpt_group: PropTypes.string
  }),
  fetchProvidersAction: PropTypes.func
};

export default AnalyticsSummary;
