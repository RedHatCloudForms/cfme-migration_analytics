import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Grid, Button, noop } from 'patternfly-react';
import Dropzone from 'react-dropzone';
import { readFirstFile } from './helpers';

const ManifestUpdateModal = ({ onClose, manifestInfo, uploadManifestAction, resetManifestAction, ...otherProps }) => (
  <Modal {...otherProps} onHide={onClose} backdrop="static" className="manifest-update-modal">
    <Dropzone onDrop={files => readFirstFile(files, file => uploadManifestAction(file.body))}>
      {({ getRootProps, getInputProps, open: openFileBrowser }) => (
        <div {...getRootProps()} onClick={event => event.preventDefault()}>
          <input {...getInputProps()} />
          <Modal.Header>
            <Modal.CloseButton onClick={onClose} />
            <Modal.Title>{__('Update Manifest')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid.Row className="show-grid">
              <Grid.Col xs={6} className="text-right">
                {__('Manifest version')}:
              </Grid.Col>
              <Grid.Col xs={6}>{manifestInfo.manifest_version}</Grid.Col>
            </Grid.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="default" onClick={resetManifestAction} disabled={manifestInfo.using_default_manifest}>
              {__('Restore Manifest Version')} {manifestInfo.default_manifest_version}
            </Button>
            <Button bsStyle="default" onClick={openFileBrowser}>
              {__('Update Manifest')}
            </Button>
            <Button bsStyle="primary" className="btn-cancel" onClick={onClose}>
              {__('Close')}
            </Button>
          </Modal.Footer>
        </div>
      )}
    </Dropzone>
  </Modal>
);

ManifestUpdateModal.propTypes = {
  onClose: PropTypes.func,
  manifestInfo: PropTypes.shape({
    manifest_version: PropTypes.string,
    default_manifest_version: PropTypes.string,
    using_default_manifest: PropTypes.bool
  }),
  uploadManifestAction: PropTypes.func,
  resetManifestAction: PropTypes.func
};

ManifestUpdateModal.defaultProps = {
  onClose: noop,
  manifestInfo: {},
  uploadManifestAction: noop,
  resetManifestAction: noop
};

export default ManifestUpdateModal;
