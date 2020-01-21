import React from 'react';
import PropTypes from 'prop-types';

const ManifestVersion = ({ manifestInfo, onEmptyState }) =>
  manifestInfo && (
    <h6 id="migration-analytics-manifest-version" className={onEmptyState ? 'on-empty-state' : ''}>
      {__('Manifest version:')}
      &nbsp;
      {manifestInfo.manifest_version}
    </h6>
  );

ManifestVersion.propTypes = {
  manifestInfo: PropTypes.shape({
    manifest_version: PropTypes.string,
    using_default_manifest: PropTypes.bool
  }).isRequired,
  onEmptyState: PropTypes.bool
};

ManifestVersion.defaultProps = {
  onEmptyState: false
};

export default ManifestVersion;
