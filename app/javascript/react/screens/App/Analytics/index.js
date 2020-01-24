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
    analytics: { manifestInfo, manifestUpdateModalVisible }
  }
}) => ({ manifestInfo, manifestUpdateModalVisible });

export default connect(
  mapStateToProps,
  { fetchManifestInfoAction, toggleManifestUpdateModalAction, uploadManifestAction, resetManifestAction }
)(Analytics);
