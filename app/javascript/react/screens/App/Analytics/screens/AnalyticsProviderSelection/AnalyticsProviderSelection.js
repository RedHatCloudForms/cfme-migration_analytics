import React from 'react';
import PropTypes from 'prop-types';
import { TypeAheadSelect, Button } from 'patternfly-react';

const AnalyticsProviderSelection = ({ summaryData, onContinueClick, onCancelClick }) => (
  <React.Fragment>
    <p>{__('Select providers for which inventory data will be collected.')}</p>
    <TypeAheadSelect
      inputProps={{ id: 'providers-select' }}
      multiple
      clearButton
      options={summaryData.providers}
      labelKey="name"
      placeholder={__('Select...')}
      emptyLabel={__('No matches found.')}
      highlightOnlyResult
      selectHintOnEnter
    />
    <br />
    <p>
      <strong>{__('Note:')}</strong>
      &nbsp;
      {__('If you need to collect workload introspection data, you must configure and run Smart State Analysis on these providers before you continue.') /* prettier-ignore */}
      <br />
      {__('Workload introspection data is required for the Workload Migration Inventory Report and for the Workload Migration Summary Report.') /* prettier-ignore */}
      <br />
      {__('See product documentation for instructions to configure and run Smart State Analysis.')}
      &nbsp;
      <a href="/miq_task">{__('Progress of Smart State Analysis tasks can be monitored on the Tasks page.')}</a>
    </p>
    <div className="footer-buttons">
      <Button onClick={onContinueClick}>{__('Continue')}</Button>
      <Button onClick={onCancelClick}>{__('Cancel')}</Button>
    </div>
  </React.Fragment>
);

AnalyticsProviderSelection.propTypes = {
  summaryData: PropTypes.shape({
    providers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    )
  }).isRequired,
  onContinueClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired
};

export default AnalyticsProviderSelection;
