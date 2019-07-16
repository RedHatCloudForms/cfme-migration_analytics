import React from 'react';
import PropTypes from 'prop-types';
import EmptyStateWithButton from './EmptyStateWithButton';

const ReportTaskError = ({ taskWithError, onRetryClick }) => (
  <EmptyStateWithButton
    iconName="error-circle-o"
    title={__('Failed to run summary report')}
    message={
      <React.Fragment>
        {__('Task failed: ')}
        {taskWithError.name}
        <br />
        {__('Error message: ')}
        {taskWithError.message}
      </React.Fragment>
    }
    buttonText={__('Try again')}
    onClick={onRetryClick}
  />
);

ReportTaskError.propTypes = {
  taskWithError: PropTypes.shape({
    name: PropTypes.string,
    message: PropTypes.string
  }).isRequired,
  onRetryClick: PropTypes.func.isRequired
};

export default ReportTaskError;
