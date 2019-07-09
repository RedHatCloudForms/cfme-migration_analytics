import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Button } from 'patternfly-react';

const AnalyticsDataCollection = ({ onCancelClick }) => (
  <React.Fragment>
    <div className="large-spinner">
      <Spinner loading size="lg" inline />
      <h3>{__('Collecting inventory data')}</h3>
    </div>
    <Button onClick={onCancelClick}>{__('Cancel')}</Button>
  </React.Fragment>
);

AnalyticsDataCollection.propTypes = {
  onCancelClick: PropTypes.func.isRequired
};

export default AnalyticsDataCollection;
