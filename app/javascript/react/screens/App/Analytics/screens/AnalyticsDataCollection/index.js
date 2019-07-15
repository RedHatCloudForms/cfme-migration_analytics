import { connect } from 'react-redux';
import AnalyticsDataCollection from './AnalyticsDataCollection';

// TODO connect redux actions and state here for running data collector

const mapStateToProps = ({ migrationAnalytics: {} }) => ({}); // eslint-disable-line no-empty-pattern

export default connect(
  mapStateToProps,
  {} // eslint-disable-line no-empty-pattern
)(AnalyticsDataCollection);
