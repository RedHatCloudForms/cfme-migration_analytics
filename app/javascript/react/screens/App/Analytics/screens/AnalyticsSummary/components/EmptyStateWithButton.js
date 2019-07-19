import React from 'react';
import PropTypes from 'prop-types';
import { Button, EmptyState, noop } from 'patternfly-react';

const EmptyStateWithButton = ({ iconType, iconName, title, message, buttonText, onClick, href }) => (
  <EmptyState>
    <EmptyState.Icon type={iconType} name={iconName} />
    <EmptyState.Title>{title}</EmptyState.Title>
    <EmptyState.Info>{message}</EmptyState.Info>
    <EmptyState.Action>
      <Button bsStyle="primary" bsSize="large" onClick={onClick} href={href}>
        {buttonText}
      </Button>
    </EmptyState.Action>
  </EmptyState>
);

EmptyStateWithButton.propTypes = {
  iconType: PropTypes.string,
  iconName: PropTypes.string,
  title: PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  href: PropTypes.string
};

EmptyStateWithButton.defaultProps = {
  iconType: 'pf',
  iconName: 'add-circle-o',
  onClick: noop,
  href: null
};

export default EmptyStateWithButton;
