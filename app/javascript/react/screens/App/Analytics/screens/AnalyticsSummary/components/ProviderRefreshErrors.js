import React from 'react';
import PropTypes from 'prop-types';
import EmptyStateWithButton from '../../../components/EmptyStateWithButton';

const ProviderRefreshErrors = ({ providersWithRefreshErrors, onRetryClick }) => (
  <EmptyStateWithButton
    iconName="error-circle-o"
    title={__('Failed to refresh providers')}
    message={
      <React.Fragment>
        {__('Failed to refresh relationships and power states for the following providers:')}
        {providersWithRefreshErrors.map(provider => (
          <React.Fragment key={provider.id}>
            <br />
            <br />
            <strong>{provider.name}</strong>
            &nbsp;&nbsp;
            <a href={`/ems_infra/${provider.id}`}>{__('View provider')}</a>
            <br />
            {provider.last_refresh_error}
          </React.Fragment>
        ))}
      </React.Fragment>
    }
    buttonText={__('Try again')}
    onClick={onRetryClick}
  />
);

ProviderRefreshErrors.propTypes = {
  providersWithRefreshErrors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      last_refresh_error: PropTypes.string
    })
  ).isRequired,
  onRetryClick: PropTypes.func.isRequired
};

export default ProviderRefreshErrors;
