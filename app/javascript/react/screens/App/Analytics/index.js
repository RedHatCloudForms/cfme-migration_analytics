import { connect } from 'react-redux';
import Analytics from './Analytics';

const fetchManifestInfoAction = () => {}; // TODO NOW

const mapStateToProps = ({ migrationAnalytics: { manifestInfo } }) => ({ manifestInfo });

export default connect(
  mapStateToProps,
  { fetchManifestInfoAction }
)(Analytics);
