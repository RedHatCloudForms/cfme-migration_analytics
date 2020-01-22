import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, noop } from 'patternfly-react';

const ManifestUpdateModal = ({ onClose, ...otherProps }) => (
  <Modal {...otherProps} onHide={onClose} backdrop="static">
    <Modal.Header>
      <Modal.CloseButton onClick={onClose} />
      <Modal.Title>{__('Update Manifest')}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h1>TODO: stuff here</h1>
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="default" className="btn-cancel" onClick={onClose}>
        {__('Close')}
      </Button>
      {/* <Button bsStyle="primary" onClick={onConfirm} disabled={disableConfirmButton}>
        {confirmButtonLabel}
      </Button> */}
    </Modal.Footer>
  </Modal>
);

ManifestUpdateModal.propTypes = {
  onClose: PropTypes.func
};

ManifestUpdateModal.defaultProps = {
  onClose: noop
};

export default ManifestUpdateModal;
