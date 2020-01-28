import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Spinner, noop } from 'patternfly-react';
import ManifestUpdateModal from './ManifestUpdateModal';

const ManifestVersion = ({
  manifestInfo,
  isLoadingManifest,
  manifestError,
  manifestUpdateModalVisible,
  toggleManifestUpdateModalAction,
  uploadManifestAction,
  resetManifestAction,
  ...otherProps
}) =>
  manifestInfo && (
    <React.Fragment>
      <h6 id="migration-analytics-manifest-version" {...otherProps}>
        {!isLoadingManifest ? (
          <React.Fragment>
            {__('Manifest version:')}
            &nbsp;
            {manifestInfo.manifest_version}
            &nbsp;
            <Button bsStyle="link" bsSize="xsmall" onClick={() => toggleManifestUpdateModalAction(true)}>
              {__('Update')}
            </Button>
          </React.Fragment>
        ) : (
          <span className="manifest-loading-message">
            {__('Loading manifest...')}
            <Spinner inline size="xs" loading />
          </span>
        )}
        {manifestError && manifestError.message && (
          <span className="manifest-error-message">
            <Icon type="pf" name="error-circle-o" size="sm" /> {manifestError.message}
          </span>
        )}
      </h6>
      <ManifestUpdateModal
        show={manifestUpdateModalVisible}
        onClose={() => toggleManifestUpdateModalAction(false)}
        manifestInfo={manifestInfo}
        uploadManifestAction={uploadManifestAction}
        resetManifestAction={resetManifestAction}
      />
    </React.Fragment>
  );

ManifestVersion.propTypes = {
  manifestInfo: PropTypes.shape({
    manifest_version: PropTypes.string
  }),
  isLoadingManifest: PropTypes.bool,
  manifestError: PropTypes.shape({ message: PropTypes.string }),
  manifestUpdateModalVisible: PropTypes.bool,
  toggleManifestUpdateModalAction: PropTypes.func,
  uploadManifestAction: PropTypes.func,
  resetManifestAction: PropTypes.func
};

ManifestVersion.defaultProps = {
  manifestInfo: null,
  isLoadingManifest: false,
  manifestError: null,
  manifestUpdateModalVisible: false,
  toggleManifestUpdateModalAction: noop,
  uploadManifestAction: noop,
  resetManifestAction: noop
};

export default ManifestVersion;
