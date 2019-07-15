import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'patternfly-react';

const LargeInlineSpinner = ({ message }) => (
  <div className="large-spinner">
    <Spinner loading size="lg" inline />
    <h3>{message}</h3>
  </div>
);

LargeInlineSpinner.propTypes = {
  message: PropTypes.string.isRequired
};

export default LargeInlineSpinner;
