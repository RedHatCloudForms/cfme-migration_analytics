import React from 'react';
import PropTypes from 'prop-types';

const AnalyticsProviderSelection = ({ summaryData }) => (
  <h1>TODO: selection for {summaryData.providers.length} providers</h1>
);

AnalyticsProviderSelection.propTypes = {
  summaryData: PropTypes.shape({
    providers: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  })
};

export default AnalyticsProviderSelection;
