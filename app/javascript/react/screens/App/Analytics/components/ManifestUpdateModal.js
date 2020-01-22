import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Grid, Button, noop } from 'patternfly-react';

const ManifestUpdateModal = ({ onClose, manifestInfo, ...otherProps }) => (
  <Modal {...otherProps} onHide={onClose} backdrop="static" className="manifest-update-modal">
    <Modal.Header>
      <Modal.CloseButton onClick={onClose} />
      <Modal.Title>{__('Update Manifest')}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Grid.Row className="show-grid">
        <Grid.Col xs={6} className="text-right">
          {__('Current manifest version')}:
        </Grid.Col>
        <Grid.Col xs={6}>{manifestInfo.manifest_version}</Grid.Col>
      </Grid.Row>
      <Grid.Row className="show-grid">
        <Grid.Col xs={6} className="text-right">
          {__('Default manifest version')}:
        </Grid.Col>
        <Grid.Col xs={6}>{manifestInfo.default_manifest_version}</Grid.Col>
      </Grid.Row>
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="default" onClick={noop /* TODO */} disabled={manifestInfo.using_default_manifest}>
        {__('Restore default manifest')}
      </Button>
      <Button bsStyle="default" onClick={noop /* TODO */}>
        {__('Upload new manifest')}
      </Button>
      <Button bsStyle="primary" className="btn-cancel" onClick={onClose}>
        {__('Close')}
      </Button>
    </Modal.Footer>
  </Modal>
);

ManifestUpdateModal.propTypes = {
  onClose: PropTypes.func,
  manifestInfo: PropTypes.shape({
    manifest_version: PropTypes.string,
    default_manifest_version: PropTypes.string,
    using_default_manifest: PropTypes.bool
  })
};

ManifestUpdateModal.defaultProps = {
  onClose: noop,
  manifestInfo: {}
};

export default ManifestUpdateModal;
