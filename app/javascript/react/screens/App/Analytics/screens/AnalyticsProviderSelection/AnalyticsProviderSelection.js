import React from 'react';
import PropTypes from 'prop-types';
import { TypeAheadSelect, Button } from 'patternfly-react';

const AnalyticsProviderSelection = ({
  summaryData,
  selectedProviders,
  selectProvidersAction,
  onContinueClick,
  onCancelClick
}) => (
  <React.Fragment>
    <p>{__('Select providers for which inventory data will be collected.')}</p>
    <TypeAheadSelect
      inputProps={{ id: 'providers-select' }}
      options={summaryData.providers}
      selected={selectedProviders}
      onChange={providers => selectProvidersAction(providers)}
      labelKey="name"
      placeholder={__('Select...')}
      emptyLabel={__('No matches found.')}
      multiple
      clearButton
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
      <Button onClick={onContinueClick} disabled={selectedProviders.length === 0}>
        {__('Continue')}
      </Button>
      <Button onClick={onCancelClick}>{__('Cancel')}</Button>
    </div>
  </React.Fragment>
);

const providerShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string
});

AnalyticsProviderSelection.propTypes = {
  summaryData: PropTypes.shape({
    providers: PropTypes.arrayOf(providerShape)
  }).isRequired,
  selectedProviders: PropTypes.arrayOf(providerShape).isRequired,
  selectProvidersAction: PropTypes.func.isRequired,
  onContinueClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired
};

export default AnalyticsProviderSelection;
