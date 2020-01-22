import React from 'react';
import PropTypes from 'prop-types';
import { Button, noop } from 'patternfly-react';
import ManifestUpdateModal from './ManifestUpdateModal';

const ManifestVersion = ({ manifestInfo, onEmptyState, manifestUpdateModalVisible, toggleManifestUpdateModalAction }) =>
  manifestInfo && (
    <React.Fragment>
      <h6 id="migration-analytics-manifest-version" className={onEmptyState ? 'on-empty-state' : ''}>
        {__('Manifest version:')}
        &nbsp;
        {manifestInfo.manifest_version}
        &nbsp;
        <Button bsStyle="link" bsSize="xsmall" onClick={toggleManifestUpdateModalAction}>
          {__('Update')}
        </Button>
      </h6>
      <ManifestUpdateModal
        show={manifestUpdateModalVisible}
        onClose={toggleManifestUpdateModalAction}
        manifestInfo={manifestInfo}
      />
    </React.Fragment>
  );

ManifestVersion.propTypes = {
  manifestInfo: PropTypes.shape({
    manifest_version: PropTypes.string
  }),
  onEmptyState: PropTypes.bool,
  manifestUpdateModalVisible: PropTypes.bool,
  toggleManifestUpdateModalAction: PropTypes.func
};

ManifestVersion.defaultProps = {
  manifestInfo: null,
  onEmptyState: false,
  manifestUpdateModalVisible: false,
  toggleManifestUpdateModalAction: noop
};

export default ManifestVersion;
