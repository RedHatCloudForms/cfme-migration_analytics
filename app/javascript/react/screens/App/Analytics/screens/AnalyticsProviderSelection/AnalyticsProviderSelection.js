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
      {__('Smart State Analysis is not configured. Inventory results will not include operating system introspection.')}
      <br />
      {__('To configure Smart State Analysis ..... ')}
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
