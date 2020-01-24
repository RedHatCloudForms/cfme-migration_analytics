import { connect } from 'react-redux';
import Analytics from './Analytics';
import {
  fetchManifestInfoAction,
  toggleManifestUpdateModalAction,
  uploadManifestAction,
  resetManifestAction
} from './redux/analyticsActions';

const mapStateToProps = ({
  migrationAnalytics: {
    analytics: {
      manifestInfo,
      manifestUpdateModalVisible,
      isFetchingManifestInfo,
      isChangingManifest,
      errorFetchingManifestInfo,
      errorChangingManifest
    }
  }
}) => ({
  manifestInfo,
  manifestUpdateModalVisible,
  isLoadingManifest: isFetchingManifestInfo || isChangingManifest,
  manifestError: errorFetchingManifestInfo || errorChangingManifest
});

export default connect(
  mapStateToProps,
  { fetchManifestInfoAction, toggleManifestUpdateModalAction, uploadManifestAction, resetManifestAction }
)(Analytics);
