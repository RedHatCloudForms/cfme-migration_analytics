import { connect } from 'react-redux';
import Analytics from './Analytics';
import { fetchManifestInfoAction } from './redux/analyticsActions';

const mapStateToProps = ({
  migrationAnalytics: {
    analytics: { manifestInfo }
  }
}) => ({ manifestInfo });

export default connect(
  mapStateToProps,
  { fetchManifestInfoAction }
)(Analytics);
