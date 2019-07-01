import { connect } from 'react-redux';
import AnalyticsDataCollection from './AnalyticsDataCollection';

const mapStateToProps = ({ migrationAnalytics: {} }) => ({});

export default connect(
  mapStateToProps,
  {}
)(AnalyticsDataCollection);
