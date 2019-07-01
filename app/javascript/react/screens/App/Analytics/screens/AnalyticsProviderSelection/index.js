import { connect } from 'react-redux';
import AnalyticsProviderSelection from './AnalyticsProviderSelection';

const mapStateToProps = ({
  migrationAnalytics: {
    analytics: { summaryData }
  }
}) => ({
  summaryData
});

export default connect(
  mapStateToProps,
  {}
)(AnalyticsProviderSelection);
