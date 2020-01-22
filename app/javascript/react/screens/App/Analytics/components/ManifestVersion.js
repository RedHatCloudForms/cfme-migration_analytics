import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner, noop } from 'patternfly-react';
import ManifestUpdateModal from './ManifestUpdateModal';

const ManifestVersion = ({
  manifestInfo,
  onEmptyState,
  manifestUpdateModalVisible,
  toggleManifestUpdateModalAction,
  updatingManifest
}) =>
  manifestInfo && (
    <React.Fragment>
      <h6 id="migration-analytics-manifest-version" className={onEmptyState ? 'on-empty-state' : ''}>
        {!updatingManifest ? (
          <React.Fragment>
            {__('Manifest version:')}
            &nbsp;
            {manifestInfo.manifest_version}
            &nbsp;
            <Button bsStyle="link" bsSize="xsmall" onClick={toggleManifestUpdateModalAction}>
              {__('Update')}
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {__('Updating manifest...')}
            <Spinner inline size="xs" loading />
          </React.Fragment>
        )}
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
  toggleManifestUpdateModalAction: PropTypes.func,
  updatingManifest: PropTypes.bool
};

ManifestVersion.defaultProps = {
  manifestInfo: null,
  onEmptyState: false,
  manifestUpdateModalVisible: false,
  toggleManifestUpdateModalAction: noop,
  updatingManifest: false
};

export default ManifestVersion;
