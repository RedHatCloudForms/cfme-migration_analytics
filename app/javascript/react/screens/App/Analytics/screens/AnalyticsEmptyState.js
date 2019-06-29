import React from 'react';
import PropTypes from 'prop-types';
import { EmptyState, Button } from 'patternfly-react';
import ProcessImprovementSvg from '../components/process-improvement.svg';

const AnalyticsEmptyState = ({ onGetStartedClick }) => (
  <EmptyState className="full-page-empty">
    <div className="blank-slate-pf-icon">
      <ProcessImprovementSvg height="80px" />
    </div>
    <EmptyState.Title>{__('Examine your virtual environment using Red Hat Migration Analytics')}</EmptyState.Title>
    <EmptyState.Info>
      {__('Get a summarized report of your virtualization providers in CloudForms and collect a detailed inventory that can be further analyzed using the Migration Analytics application on cloud.redhat.com.') /* prettier-ignore */}
    </EmptyState.Info>
    <EmptyState.Action>
      <Button bsStyle="primary" bsSize="large" onClick={onGetStartedClick}>
        {__('Get started')}
      </Button>
    </EmptyState.Action>
  </EmptyState>
);

AnalyticsEmptyState.propTypes = {
  onGetStartedClick: PropTypes.func.isRequired
};

export default AnalyticsEmptyState;
