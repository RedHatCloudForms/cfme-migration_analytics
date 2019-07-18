import React from 'react';
import PropTypes from 'prop-types';
import { TypeAheadSelect, Button, Form, Icon } from 'patternfly-react';

const AnalyticsProviderSelection = ({
  summaryData,
  selectedProviders,
  selectProvidersAction,
  detailedDataSelected,
  selectDetailedDataAction,
  onContinueClick,
  onCancelClick
}) => (
  <Form>
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

    <Form.FormGroup className="detailed-data-selection">
      <Form.ControlLabel>{__('Inventory data needed')}</Form.ControlLabel>
      <Form.Radio
        checked={!detailedDataSelected}
        onChange={event => selectDetailedDataAction(event.target.value !== 'on')}
      >
        {__('Basic data')}
        <ul>
          <li>{__('High level information including number of VMs and hypervisors.')}</li>
          <li>{__('Necessary to calculate an initial migration savings estimate.')}</li>
          <li>{__('Data may or may not include SmartState Analysis results.')}</li>
        </ul>
      </Form.Radio>
      <Form.Radio
        checked={detailedDataSelected}
        onChange={event => selectDetailedDataAction(event.target.value === 'on')}
      >
        {__('Detailed data')}
        <ul>
          <li>
            {__('Detailed analysis of individual VMs including host, operating system, files, and running services.')}
          </li>
          <li>{__('Necessary for creating workload inventory and workload summary reports.')}</li>
          <li>
            {__('Requires that SmartState Analysis be run on each VM. This can take several hours depending on the number of VMs in the selected providers.') /* prettier-ignore */}
          </li>
        </ul>
        {detailedDataSelected && (
          <div className="icon-with-content smart-state-info">
            <Icon type="pf" name="warning-triangle-o" className="p-aligned" />
            <p>
              {__('See product documentation for instructions to configure and run SmartState Analysis.')}
              <br />
              <a href="/miq_task">{__('Progress of Smart State Analysis tasks can be monitored on the Tasks page.')}</a>
            </p>
          </div>
        )}
      </Form.Radio>
    </Form.FormGroup>

    <div className="footer-buttons">
      <Button bsStyle="primary" onClick={onContinueClick} disabled={selectedProviders.length === 0}>
        {__('Continue')}
      </Button>
      <Button onClick={onCancelClick}>{__('Cancel')}</Button>
    </div>
  </Form>
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
  detailedDataSelected: PropTypes.bool.isRequired,
  selectDetailedDataAction: PropTypes.func.isRequired,
  onContinueClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired
};

export default AnalyticsProviderSelection;
