import { connect } from 'react-redux';
import AnalyticsProviderSelection from './AnalyticsProviderSelection';
import { selectProvidersAction } from '../../redux/analyticsActions';

const mapStateToProps = ({
  migrationAnalytics: {
    analytics: { summaryData, selectedProviders }
  }
}) => ({
  summaryData,
  selectedProviders
});

export default connect(
  mapStateToProps,
  { selectProvidersAction }
)(AnalyticsProviderSelection);
